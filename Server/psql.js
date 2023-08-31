import { Client } from 'pg'
const client = new Client()
await client.connect()

const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()

const mysql = require("mysql2");

const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      // console.log('does it get here?')
      'CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, cookie CHAR (100) NOT NULL, name CHAR(30), email CHAR (50), password CHAR (30), phonenumber CHAR (20), street CHAR (50), city CHAR (30), zipcode CHAR(10), ccnum INT, expdate CHAR (10), CVV INT, billzipcode CHAR (10), UNIQUE (cookie));'
    ))
  .catch((err) => console.log(err));

module.exports = db;