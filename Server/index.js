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
app.get(`/${process.env.LOADERIO}/`, controllers.getLoader);

const PORTSERV = process.env.PORTSERV || 3000;
app.listen(PORTSERV, () => {
  console.log(`Server is listening on port ${PORTSERV}`);
});
