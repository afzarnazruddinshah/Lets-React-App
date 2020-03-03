const express = require('express'); //for creating APIs
const bodyParser = require('body-parser'); //middleware to parse request bodies
const cors = require('cors'); // to enable CORS (Cross-Origin-Resource-Sharing)
const jwt = require('jsonwebtoken');
var crypto = require('crypto');
const PORT =3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const SALT = '4b01aeb1815b65aadf67ed74a527f744';

//*****Setting up the MongoDb Client *****//
var mongoDbURL = 'mongodb://localhost:27017'
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(mongoDbURL, (err, database) => {
     if(err) throw err;
     db = database.db('letsreact') // Specify DB name here
     app.listen(PORT, () => {
       console.log('********************************************');
       console.log('  Server Started; Running on Port: '+PORT+' ');
       console.log('********************************************');
  });
});

//*****API Routes start from here*****//
//Root API Route
app.get('/', (req, res)=> {
  res.send('Welcome to LetsReact Server ');
});

//Logging in to the Application
app.post('/api/auth', (req, res)=> {
  var { email, password} = req.body;
  var hashedPwd = crypto.pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`); 
  db.collection('users').findOne(
    {email: email, password: hashedPwd}
    , (err, result)=> {
      if (err)
      {
        res.status(200).send({ error: true, payload: { token: null, errormsg: 'exception'}});
      }
      if(result === null)
      {
        res.status(200).send({ error: true, payload: { token: null, errormsg: 'notfound'}});
      }
      else
      {
        let payload = { subject: result._Id};
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({ error: false, payload: { result: result, token: token}});
      }
  })
});

//New User Registration API
app.post('/newuser', (req, res)=> {
  var {fname, lname, email, pwd } = req.body;

  //Password Hashing
  // var salt = crypto.randomBytes(16).toString('hex'); 
  var hashedPwd = crypto.pbkdf2Sync(pwd, SALT, 1000, 64, `sha512`).toString(`hex`); 

  db.collection('users').findOne(
    {email: email}, (err, result)=> {
      if(err) 
      {
        res.status(200).send({ error: true, payload: { result: null}});
      }
      else
      {
        if(result !== null)
        {
          res.status(200).send({ error: false, payload: { result: 'alreadyPresent'}});
        }
        else
        {
            db.collection('users').insertOne({
              'fname' : fname,
              'lname':  lname,
              'email':  email,
              'password': hashedPwd
            }, (err, result)=> {
              if (err) return res.status(200).send({error: true, payload: { result: null}});
              else
              {
                res.status(200).send({error: false, payload: { result: result}});
              }
            });
        }
      }
    });


});

//Fetching all the Blood Requests
app.get('/api/bloodreqs',verifyToken, (req, res)=> 
{
  db.collection('bloodreqs').find({}).toArray( (err, result)=> 
  {
    if(err)
    {
      res.status(200).send({ error: true, payload: { result: null}});
    }
    else
    {
      res.status(200).send({ error: false, payload: { result: result}});
    }
  })
});

//Adding New Blood Request
app.post('/api/newbloodreq',verifyToken, (req, res)=> {
  var { ptntname, ptntage, ptntgender, ptntblgrp, unitsreq, reqreason, dateofreq, hospname, hosploc, attendeename, cntctno1, cntctno2, requestOwner} = req.body;
  db.collection('bloodreqs').insertOne({
    'ptntname': ptntname,
    'ptntage': ptntage,
    'ptntgender': ptntgender,
    'ptntblgrp': ptntblgrp,
    'unitsreq': unitsreq,
    'reqreason': reqreason,
    'dateofreq': dateofreq,
    'hospname': hospname,
    'hosploc': hosploc,
    'attendeename': attendeename,
    'cntctno1': cntctno1,
    'cntctno2': cntctno2,
    'requestOwner': requestOwner
  }, (err, result)=> {
    if (err)
    {
      res.status(200).send({ error: true, payload: { result: null}})
    }
    else
    {
      res.status(200).send({ error: false, payload: { result: 'dpUpdated'}});
    }
  });
});

app.post('/api/myrequests',verifyToken, (req, res)=> {
  var  requestOwner = req.body.requestOwner;
  // console.log(requestOwner);
  db.collection('bloodreqs').find({'requestOwner': requestOwner}, {}).toArray((err, result)=> 
  {
    //if any error in fetching data from mongodb, log the error
    if (err)
    {
      res.status(200).send({ error: true, payload: { result: null, errormsg: 'exception'}});
    }
    if(result.length === 0)
    {
      res.status(200).send({ error: false, payload: { result: null, errormsg: 'norequests'}});
    }
    else
    {
      res.status(200).send({ error: false, payload: { result: result}});
      // res.send(JSON.stringify(result)); //sending the data as a JSON String
    }
    
  });
});

app.post('/api/myprofile', verifyToken, (req, res)=> {
  var email = req.body.email;
  db.collection('users').find({'email': email },{}).toArray( (err, result)=> {
    if(err)
    {
      res.status(200).send({ error: true, payload: { result: null}});
      // res.status(200).send({ error: true, payload: { result: null}});
    }
    else
    {
      res.status(200).send({ error: false, payload: { result: result}});
      // res.status(200).send({payload: result, result: true});
    }
  })
});

app.post('/api/myprofile/update', verifyToken, (req, res)=> {
  var { email, fname, lname, age, gender, dob, bloodgroup, contact, city, state, landmark} = req.body;
  db.collection('users').updateMany( 
    { "email": email}, 
    { $set:
    { 
      "fname": fname, "lname": lname,
      "age": age, "gender": gender, "dob": dob, "bloodgroup": bloodgroup,
      "contact": contact, "city": city, "state": state, "landmark": landmark
    } }, (err, result)=> {
      if(err)
      {
        console.log(err);
        res.status(200).send({ error: true, payload: { result: null}});
      }
      else
      {
        res.status(200).send({error: false, payload: { result: result}});
      }
    });
  });

//VerifyToken function to verify the token from the LocalStorage
function verifyToken(req, res, next)
{
  // console.log('verifying token...');
  try {
    if(!req.headers.authorization)
    {
      return res.status(401).send({ error: true, payload: { result: null}});
      // return res.status(401).send('Unauthorized request');
    }
  
    let token = req.headers.authorization.split(' ')[1];
    let token1 = req.headers.authorization.split(' ')[0];
    if(token === 'null' || token === null || token1 === null || token1 === 'null')
    {
      return res.status(401).send({ error: true, payload: { result: null}});
      // return res.status(401).send('Unauthorized request');
    }
  
    let payload = jwt.verify(token, 'secretKey');
    if(!payload)
    {
      return res.status(401).send({ error: true, payload: { result: null}});
      // return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    // console.log('token verified...');
    next();
    }
    catch(e)
    {
      return res.status(401).send({ error: true, payload: { result: null}});
      // return res.status(401).send('Unauthorized request');
    }
}  //verifyToken ends here