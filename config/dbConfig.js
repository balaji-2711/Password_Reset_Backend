const mongodb = require('mongodb')
const dbName = 'Password_Reset'
const dbUrl = `mongodb+srv://balaji:balapass@cluster0.wr30crl.mongodb.net/${dbName}`;


module.exports = { mongodb, dbName, dbUrl};


