require('dotenv').config();
const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(express.json());
app.get('/product', controllers.getProduct);
app.get('/product/features', controllers.getFeatures);
app.get('/product/styles', controllers.getStyles);
app.get('/product/related', controllers.getRelated);
app.get('/product/relatedStyle', controllers.getStyles);

const PORTSERV = process.env.PORTSERV || 3000;
app.listen(PORTSERV, () => {
  console.log(`Server is listening on port ${PORTSERV}`);
});

// require('dotenv').config();
// const path = require('path');
// const { Client } = require('pg');
// const csv = require('csv-parser');
// const fs = require('fs');

// const file = path.join(__dirname, './data/photos.csv');
// const results = [];
// const modifiedResults = [];

// const client = new Client({
//   host: 'localhost',
//   user: process.env.USER,
//   port: process.env.PORT,
//   password: 'postgres',
//   database: 'productdb',
// });

// fs.createReadStream(file)
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     for (let i = 5; i < 37; i += 1) {
//       const currentObj = results[i];

//       const numId = Number(currentObj.id);
//       currentObj.id = numId;
//       currentObj.styleId = Number(currentObj.styleId);
//       modifiedResults.push(currentObj);
//     }

//     client.connect()
//       .then(() => {
//         console.log('Connected to SDC Database');
//       })
//       .then(() => {
//         const query = 'INSERT INTO photos(id, styleId, url, thumbnail_url) VALUES ($1, $2, $3, $4)';
//         modifiedResults.forEach((row) => {
//           const arr = [];
//           arr.push(row.id);
//           arr.push(row.styleId);
//           arr.push(row.url);
//           arr.push(row.thumbnail_url);
//           client.query(query, arr, (err, res) => {
//             if (err) {
//               console.log(err);
//             } else {
//               // console.log("inserted " + res.rowCount + " row:", arr);
//             }
//           });
//         });
//       });
//   });
