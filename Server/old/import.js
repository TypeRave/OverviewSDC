require('dotenv').config();
const path = require('path');
const { Client } = require('pg');
const csv = require('csv-parser');
const fs = require('fs');

const file = path.join(__dirname, './data/photos.csv');
const results = [];
const modifiedResults = [];

const client = new Client({
  host: 'localhost',
  user: process.env.USER,
  port: process.env.PORT,
  password: 'postgres',
  database: 'productdb',
});

fs.createReadStream(file)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    for (let i = 0; i < 500; i += 1) {
      const currentObj = results[i];

      const numId = Number(currentObj.id);
      currentObj.id = numId;
      currentObj.styleId = Number(currentObj.styleId);
      modifiedResults.push(currentObj);
    }

    client.connect()
      .then(() => {
        console.log('Connected to SDC Database');
      })
      .then(() => {
        const query = 'INSERT INTO photos(id, styleId, url, thumbnail_url) VALUES ($1, $2, $3, $4)';
        modifiedResults.forEach((row) => {
          const arr = [];
          arr.push(row.id);
          arr.push(row.styleId);
          arr.push(row.url);
          arr.push(row.thumbnail_url);
          client.query(query, arr, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              // console.log("inserted " + res.rowCount + " row:", arr);
            }
          });
        });
      });
  });

// fs.createReadStream(file)
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     const test = [];
//     for (let i = 0; i < 500; i += 1) {
//       const currentObj = results[i];
//       // if (currentObj.name === 'Evangeline Shoes') {
//       //   test.push(currentObj);
//       // }
//       const numId = Number(currentObj.id);
//       currentObj.id = numId;
//       currentObj.styleId = Number(currentObj.styleId);
//       // currentObj.related_product_id = Number(currentObj.related_product_id);
//       // if (currentObj.value === 'null') {
//       //   currentObj.value = null;
//       // }
//       modifiedResults.push(currentObj);
//     }

//     client.connect()
//       .then(() => {
//         console.log('Connected to SDC Database');
//       })
//       .then(() => {
//         const query = 'INSERT INTO skus(id, styleId, size, quantity) VALUES ($1, $2, $3, $4)';
//         modifiedResults.forEach((row) => {
//           const arr = [];
//           arr.push(row.id);
//           arr.push(row.styleId);
//           arr.push(row.size);
//           arr.push(row.quantity);
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



// require("dotenv").config();
// const express = require("express");
// const path = require("path");
// const cvs = require('csv-parser');
// const { Client } = require('pg');
// const csv = require('csv-parser');
// const fs = require('fs');

// const file = path.join(__dirname, './data/product.csv');
// const resultsProduct = [];
// const resultsStyles = [];
// const modifiedResults = [];

// const client = new Client({
//   host: 'localhost',
//   user: process.env.USER,
//   port: process.env.PORT,
//   password: 'postgres',
//   database: 'productdb'
// });

// fs.createReadStream(file)
//   .pipe(csv())
//   .on('data', (data) => resultsProduct.push(data))
//   .on('end', () => {
//     const test =[];
//     const quick =[];
//     for (let i = 0; i <resultsProduct.length; i++) {
//       const currentObj = resultsProduct[i];
//       if (currentObj.name === 'Evangeline Shoes') {
//         test.push(currentObj);
//       }
//       const numId = Number(currentObj.id);
//       currentObj.id = numId;
//       const price = Number(currentObj.default_price);
//       currentObj.default_price = price;
//       modifiedResults.push(currentObj);
//     }
//     console.log(test);

//     for (let i = 0; i<10; i++) {
//       quick.push(modifiedResults[i]);
//     }

//     client.connect()
//     .then(() => {
//       console.log('Connected to SDC Database');
//     })
//     .then(() => {
//       const query = 'INSERT INTO product(id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)';
//       modifiedResults.forEach(row => {
//         const arr = [];
//         arr.push(row.id);
//         arr.push(row.name);
//         arr.push(row.slogan);
//         arr.push(row.description);
//         arr.push(row.category);
//         arr.push(row.default_price);
//         client.query(query, arr, (err, res) => {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log("inserted " + res.rowCount + " row:", arr);
//           }
//         });
//       });
//     })
//   });


// // fs.createReadStream(file)
// //   .pipe(csv())
// //   .on('data', (data) => resultsProduct.push(data))
// //   .on('end', () => {
// //     const test = [];
// //     for (let i = 0; i < resultsProduct.length; i += 1) {
// //       const currentObj = resultsProduct[i];
// //       if (currentObj.name === 'Evangeline Shoes') {
// //         test.push(currentObj);
// //       }
// //       const numId = Number(currentObj.id);
// //       currentObj.id = numId;
// //       const price = Number(currentObj.default_price);
// //       currentObj.default_price = price;
// //       modifiedResults.push(currentObj);
// //     }

// //     client.connect()
// //       .then(() => {
// //         console.log('Connected to SDC Database');
// //       })
// //       .then(() => {
// //         const query = 'INSERT INTO product(id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)';
// //         modifiedResults.forEach((row) => {
// //           const arr = [];
// //           arr.push(row.id);
// //           arr.push(row.name);
// //           arr.push(row.slogan);
// //           arr.push(row.description);
// //           arr.push(row.category);
// //           arr.push(row.default_price);
// //           client.query(query, arr, (err, res) => {
// //             if (err) {
// //               console.log(err);
// //             } else {
// //               // console.log("inserted " + res.rowCount + " row:", arr);
// //             }
// //           });
// //         });
// //       });
// //   });

// // fs.createReadStream(file)
// //   .pipe(csv())
// //   .on('data', (data) => results.push(data))
// //   .on('end', () => {
// //     const test = [];
// //     for (let i = 0; i < results.length; i += 1) {
// //       const currentObj = results[i];
// //       if (currentObj.name === 'Evangeline Shoes') {
// //         test.push(currentObj);
// //       }
// //       const numId = Number(currentObj.id);
// //       currentObj.id = numId;
// //       currentObj.original_price = Number(currentObj.original_price);
// //       if (currentObj.sale_price === 'null') {
// //         currentObj.sale_price = null;
// //       } else {
// //         currentObj.sale_price = Number(currentObj.sale_price);
// //       }
// //       modifiedResults.push(currentObj);
// //     }

// //     client.connect()
// //       .then(() => {
// //         console.log('Connected to SDC Database');
// //       })
// //       .then(() => {
// //         const query = 'INSERT INTO styles(id, productId, name, sale_price, original_price, default_style) VALUES ($1, $2, $3, $4, $5, $6)';
// //         modifiedResults.forEach((row) => {
// //           const arr = [];
// //           arr.push(row.id);
// //           arr.push(row.productId);
// //           arr.push(row.name);
// //           arr.push(row.sale_price);
// //           arr.push(row.original_price);
// //           arr.push(row.default_style);
// //           client.query(query, arr, (err, res) => {
// // //             if (err) {
// // //               console.log(err);
// // //             } else {
// // //               // console.log("inserted " + res.rowCount + " row:", arr);
// // //             }
// // //           });
// // //         });
// // //       });
// // //   });

// // fs.createReadStream(file)
// //   .pipe(csv())
// //   .on('data', (data) => results.push(data))
// //   .on('end', () => {
// //     const test = [];
// //     for (let i = 0; i < 1; i += 1) {
// //       const currentObj = results[i];
// //       // if (currentObj.name === 'Evangeline Shoes') {
// //       //   test.push(currentObj);
// //       // }
// //       const numId = Number(currentObj.id);
// //       currentObj.id = numId;
// //       currentObj.styleid = Number(currentObj.styleId);

// //       currentObj.quantity = Number(currentObj.quantity);
// //       // if (currentObj.sale_price === 'null') {
// //       //   currentObj.sale_price = null;
// //       // } else {
// //       //   currentObj.sale_price = Number(currentObj.sale_price);
// //       // }
// //       modifiedResults.push(currentObj);
// //     }
// //     console.log(modifiedResults);

// //     client.connect()
// //       .then(() => {
// //         console.log('Connected to SDC Database');
// //       })
// //       .then(() => {
// //         const query = 'INSERT INTO styles(id, styleid, size, quantity) VALUES ($1, $2, $3, $4)';
// //         modifiedResults.forEach((row) => {
// //           console.log(row);
// //           const arr = [];
// //           arr.push(row.id);
// //           arr.push(row.styleid);
// //           arr.push(row.size);
// //           arr.push(row.quantity);
// //           console.log(arr);
// //           client.query(query, arr, (err, res) => {
// //             if (err) {
// //               console.log(err);
// //             } else {
// //               // console.log("inserted " + res.rowCount + " row:", arr);
// //             }
// //           });
// //         });
// //       });
// //   });

// fs.createReadStream(file)
// .pipe(csv())
// .on('data', (data) => results.push(data))
// .on('end', () => {
//   const test = [];
//   for (let i = 0; i < results.length; i += 1) {
//     const currentObj = results[i];
//     // if (currentObj.name === 'Evangeline Shoes') {
//     //   test.push(currentObj);
//     // }
//     const numId = Number(currentObj.id);
//     currentObj.id = numId;
//     currentObj.current_product_id = Number(currentObj.current_product_id);
//     currentObj.related_product_id = Number(currentObj.related_product_id);
//     if (!currentObj.related_product_id) {
//       currentObj.related_product_id = null;
//     } else {
//       currentObj.related_product_id = Number(currentObj.related_product_id);
//     }
//     modifiedResults.push(currentObj);
//   }

//   client.connect()
//     .then(() => {
//       console.log('Connected to SDC Database');
//     })
//     .then(() => {
//       const query = 'INSERT INTO related(id, current_product_id, related_product_id) VALUES ($1, $2, $3)';
//       modifiedResults.forEach((row) => {
//         const arr = [];
//         arr.push(row.id);
//         arr.push(row.current_product_id);
//         arr.push(row.related_product_id);
//         client.query(query, arr, (err, res) => {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log("inserted " + res.rowCount + " row:", arr);
//           }
//         });
//       });
//     });
// });


