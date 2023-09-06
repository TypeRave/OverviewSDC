require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: process.env.USER,
  port: process.env.PORT,
  password: 'postgres',
  database: 'productdb',
});

client.connect()
  .then(() => {
    console.log('Connected to SDC Database');
  })
  .catch((err) => {
    console.log('Error connecting to the database');
    console.log(err);
  });

exports.get = (query) => (
  client.query(query)
);
