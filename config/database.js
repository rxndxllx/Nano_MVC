const mysql = require('mysql2');

/*
|   Setting the credentials for the database
*/
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'express_auth'
});

/*
|   Initialize connection to the database  
*/
db.connect();

module.exports = db;
