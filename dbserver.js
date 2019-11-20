const express = require('express');
const bodyParser = require('body-parser');
// Initialize the app
const app = express();
// https://expressjs.com/en/guide/routing.html
// app.use(bodyParser.urlencoded({extended: true}))
//urlencoded function extracts form data and puts them into the body of the res object

// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cors = require('cors');
// Then use it before your routes are set up:
app.use(cors());

app.get('/users', function(req, res){
    res.send('Hi Sir');
});
var mongoDbURL = 'mongodb://localhost:27017'
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(mongoDbURL, (err, database) => {

     console.log('server connected');
     if(err) throw err;
     db = database.db('letsreact') // whatever your database name is
     app.listen(3001, () => {
     console.log('listening on 3001')
  })
})

// Start the server
// app.listen(3000, () => {
//  console.log('Go to http://localhost:3000/users to see users');
// });

app.post('/quotes', (req, res) => {
    db.collection('users').save({id: 1, name: 'livingstone'}, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database1')
    //   console.log(result);
      res.send('collection saved');
      
    })
  })



app.post('/loggeduser', (req, res)=> {


  var {email, fname } = req.body;

  
  console.log(email, fname);
    db.collection('curuser').insertOne({
        email: email,
        fname: fname
    }, (err, result)=> {
        if(err) return console.log(err);
        console.log('User logged in');
        res.send('Current User Updated');
    })
})

app.post('/curuserdel', (req, res) => {

    db.collection('curuser').deleteMany({}, (err, result)=> {
        if (err) return console.log(err);
        console.log('Current User Removed');
        console.log('user Logged out');
        res.send('Current User Removed');
    });
    // db.collection('curuser').save({id: 1, name: 'livingstone'}, (err, result) => {
    //   if (err) return console.log(err)
    //   console.log('user removed from current user')
    // //   console.log(result);
    //   res.send('user removed');
      
    // })
  });

app.get('/loginuser', (req, res)=> {
    var { email, password} = req.query;
    // console.log(email, password);
    db.collection('users').findOne(
      {email: email, password: password}
      , (err, result)=> {
        if (err) return console.log(err);
        console.log('logged in successfully');
        // console.log(result.data);
        res.send(result);
    })
});

app.get('/bloodreqs', (req, res)=> {
  db.collection('bloodreqs').find({}).toArray( (err, result)=> {
    if (err) return console.log(err);
    console.log('result Fetched');
    res.send(JSON.stringify(result));
  })
});

app.post('/newbloodreq', (req, res)=> {

  var ptntname = req.body.ptntname;
  var { ptntname, ptntage, ptntgender, ptntblgrp, unitsreq, reqreason, dateofreq, hospname, hosploc, attendeename, cntctno1, cntctno2} = req.body;
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
    'cntctno2': cntctno2
  }, (err, result)=> {
    if (err) return console.log(err);
    console.log('added');
    res.send(result);
  })
});

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
})