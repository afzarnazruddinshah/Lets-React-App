const crypto = require('crypto');
var salt = crypto.randomBytes(16).toString('hex'); 
console.log(salt);