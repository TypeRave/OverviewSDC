const connection = require('./database');

exports.getProduct = (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const startIndex = (page * count) - count;
  const query = `SELECT * FROM product LIMIT ${count} OFFSET ${startIndex} `;
  connection.getStyles(query)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

exports.getStyles = (req, res) => {
  const productId = req.query.product_id;
  const query = `SELECT styles.*, styles.id AS styleId, skus.*, skus.id AS skuID, photos.*, photos.id AS photoID FROM styles LEFT JOIN skus ON styles.id = skus.styleId LEFT JOIN photos on photos.styleId = styles.id WHERE styles.productID = ${productId}`;
  connection.getStyles(query)
    .then((response) => {
      const resultsArr = [];
      const tempObj = {};
      const photosCheck = {};

      for (let i = 0; i < response.rows.length; i += 1) {
        const styleId = response.rows[i].styleid;
        if (!tempObj[styleId]) {
          tempObj[styleId] = {};
          if (!response.rows[i].default_style) {
            tempObj[styleId].default = false;
          } else {
            tempObj[styleId].default = true;
          }
          tempObj[styleId].name = response.rows[i].name;
          tempObj[styleId].original_price = response.rows[i].original_price;
          tempObj[styleId].photos = [];
          tempObj[styleId].sale_price = response.rows[i].sale_price;
          tempObj[styleId].skus = {};
          tempObj[styleId].style_id = response.rows[i].styleid;
        }
        const rowSku = response.rows[i].skuid;
        if (!tempObj[styleId].skus[rowSku]) {
          tempObj[styleId].skus[rowSku] = {
            quantity: response.rows[i].quantity,
            size: response.rows[i].size,
          };
        }
        const currentPhoto = response.rows[i].photoid;
        if (!photosCheck[currentPhoto]) {
          photosCheck[currentPhoto] = true;
          const photosObj = {
            thumbnail_url: response.rows[i].thumbnail_url,
            url: response.rows[i].url,
          };
          tempObj[styleId].photos.push(photosObj);
        }
      }
      const keys = Object.keys(tempObj);
      for (let i = 0; i < keys.length; i += 1) {
        resultsArr.push(tempObj[keys[i]]);
      }

      const responseObj = {
        product_id: productId,
        results: resultsArr,
      };
      res.send(responseObj);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

exports.getRelated = (req, res) => {
  const productId = req.query.product_id;
  const query = `SELECT related_product_id FROM related WHERE current_product_id = ${productId}`;
  connection.getRelated(query)
    .then((response) => {
      const responseArr = [];
      for (let i = 0; i < response.rows.length; i += 1) {
        responseArr.push(response.rows[i].related_product_id);
      }
      res.send(responseArr);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

exports.getFeatures = (req, res) => {
  const productId = req.query.product_id;
  const query = `SELECT * FROM product INNER JOIN features ON product.id = features.productid WHERE product.id = ${productId}`;
  connection.getRelated(query)
    .then((response) => {
      const responseObj = {};
      if (response.rows.length > 0) {
        if (Object.keys(responseObj).length === 0) {
          responseObj.id = response.rows[0].productid;
          responseObj.name = response.rows[0].name;
          responseObj.slogan = response.rows[0].slogan;
          responseObj.description = response.rows[0].description;
          responseObj.category = response.rows[0].category;
          responseObj.default_price = response.rows[0].default_price;
          responseObj.features = [];
        }
        for (let i = 0; i < response.rows.length; i += 1) {
          const currentFeature = {
            feature: response.rows[i].feature,
            value: response.rows[i].value,
          };
          responseObj.features.push(currentFeature);
        }
      }
      res.send(responseObj);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};
