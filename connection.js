//  npm dependencies
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = connection;