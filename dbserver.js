const express = require('express'); //for creating APIs
const bodyParser = require('body-parser'); //middleware to parse request bodies
const cors = require('cors'); // to enable CORS (Cross-Origin-Resource-Sharing)
const jwt = require('jsonwebtoken');
// Initialize the app
const app = express();
// https://expressjs.com/en/guide/routing.html
// app.use(bodyParser.urlencoded({extended: true}))
//urlencoded function extracts form data and puts them into the body of the res object

//*****Setting up the Express Server*****//
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Then use it before your routes are set up:
app.use(cors());

//*****Setting up the MongoDb Client *****//
var mongoDbURL = 'mongodb://localhost:27017'
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(mongoDbURL, (err, database) => {
     console.log('server connected');
     if(err) throw err;
     db = database.db('letsreact') // whatever your database name is
     app.listen(3001, () => {
     console.log('listening on 3001')
  });
});

//************************************//
//*****API Routes start from here*****//
//************************************//
//Root API Route
app.get('/', (req, res)=> {
  res.send('Welcome to LetsReact Server ');
});

//Logging in to the Application
app.get('/loginuser', (req, res)=> {
  var { email, password} = req.query;
  console.log(email, password);
  db.collection('users').findOne(
    {email: email, password: password}
    , (err, result)=> {
      if (err)
      {
        console.log(err);
        res.status(200).send({result: 'error', auth: false, token: 'none'});
      }
      if(result === null)
      {
        res.status(200).send({result: 'none', auth: false, token:'none'});
      }
      else
      {
        let payload = { subject: result._Id};
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({result: result, auth: true, token: token});
      }
      
  })
});

//Fetching all the Blood Requests
app.get('/bloodreqs',verifyToken, (req, res)=> 
{
  //fetching data from Mongodb Collection called 'bloodreqs'
  // and sending the result to back end
  db.collection('bloodreqs').find({}).toArray( (err, result)=> 
  {
    //if any error in fetching data from mongodb, log the error
    if (err) return console.log(err);
    //else send it to the client in the response
    console.log('result Fetched');
    res.send(JSON.stringify(result)); //sending the data as a JSON String
  })
});

//Adding New Blood Request
app.post('/newbloodreq',verifyToken, (req, res)=> {
  var ptntname = req.body.ptntname;
  var { ptntname, ptntage, ptntgender, ptntblgrp, unitsreq, reqreason, dateofreq, hospname, hosploc, attendeename, cntctno1, cntctno2, requestOwner} = req.body;
  console.log(ptntname);
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
    if (err) return console.log(err);
    console.log('added');
    console.log('added again');
    res.send(result);
  })
});

//
app.post('/newuser', (req, res)=> {
  var {fname, lname, email, pwd } = req.body;
  // console.log(fname, lname, email, pwd);
  db.collection('users').insertOne( {
    'fname' : fname,
    'lname': lname,
    'email': email,
    'password': pwd
  }, (err, result)=> {
    if (err) return res.send(err);
    console.log('User added');
    res.send(result);
  })
});

app.post('/myrequests',verifyToken, (req, res)=> {
  var  requestOwner = req.body.requestOwner;
  console.log(requestOwner);
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  db.collection('bloodreqs').find({'requestOwner': requestOwner}, {}).toArray((err, result)=> 
  {
    //if any error in fetching data from mongodb, log the error
    if (err) return console.log(err);
    //else send it to the client in the response
    console.log('My Requests fetched');
    res.send(JSON.stringify(result)); //sending the data as a JSON String
  });
});

//VerifyToken function to verify the token from the LocalStorage
function verifyToken(req, res, next)
{
  console.log('verifying token...');
  try {
    if(!req.headers.authorization)
    {
      return res.status(401).send('Unauthorized request');
    }
  
    let token = req.headers.authorization.split(' ')[1];
    let token1 = req.headers.authorization.split(' ')[0];
    if(token === 'null' || token === null || token1 === null || token1 === 'null')
    {
      return res.status(401).send('Unauthorized request');
    }
  
    let payload = jwt.verify(token, 'secretKey');
    if(!payload)
    {
      return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    console.log('token verified...');
    next();
    }
    catch(e)
    {
      return res.status(401).send('Unauthorized request');
    }
}  //verifyToken ends here