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

// this is a GET API - 'http://localhost:3001/users'
// app.get() means you are creating a GET API 
// Syntax is app.get(API_URL, callBackFunction(){})
// Here, API_URL is the API URL - /users in our case
// call back function is nothing but the function that gets executed when
// User makes a request to this API
// Here, when you make a HTTP call to this API - /users, you ll get 'Hi Sir' message in response
app.get('/users', function(req, res){
    res.send('Hi Sir');
});

// App.listen will run the Express server in the specified port number - 3001 in our case.
app.listen(3001, () => {
    console.log('listening on 3001')
 });


 // Go to the folder where this .js file is present and open a cmd
 // And run node filename.js
 //you should get 'listening on 3001' message in cmd console