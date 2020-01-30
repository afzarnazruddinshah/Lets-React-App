const nodemailer = require("nodemailer");
const SMTPConnection = require("nodemailer/lib/smtp-connection");

var options = {
  port: 443, 
  host: 'mail.valuelabs.com',
}

let connection = new SMTPConnection(options);

connection.connect((err, result)=> {
  console.log(result);
});

var auth = {
    user: 'livingstone.pilavendran@valuelabs.com',
    pass: 'lesleyBABU!23'
  
}

connection.login(auth, ()=> 
{
  console.log('connected');
});
var envelope = {
  from: 'livingstone.pilavendran@valuelabs.com',
  to: 'livingstone.pilavendran@valuelabs.com'
}
 var message  = 'Hello Dear';

connection.send(envelope, message, (err)=> {
  if(err)
  {
    console.log(err);
  }
  else{ console.log('message sent');}
});

connection.quit();
