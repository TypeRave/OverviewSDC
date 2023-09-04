const frisby = require('frisby');
const product = require('./exampleData');

const URL = 'http://localhost:3001/product';

describe('getProduct', () => {
  it('should return products for a given page and count', () => {
    const params = '?page=20&count=7';
    return frisby.fetch(`${URL}${params}`)
      .expect('status', 200)
      .then((res) => {
        let body = res.body;
        body = JSON.parse(body);
        for (let i = 0; i < body.length; i += 1) {
          expect(body.id).toBe(product.product.id);
          expect(body.name).toBe(product.product.name);
          expect(body.slogan).toBe(product.product.slogan);
          expect(body.category).toBe(product.product.category);
          expect(body.description).toBe(product.product.description);
          expect(body.default_price).toBe(product.product.default_price);
        }
      });
  });
});

describe('getRelated', () => {
  it('should return related products for a given product', () => {
    const params = '/related?product_id=3';
    return frisby.fetch(`${URL}${params}`)
      .expect('status', 200)
      .then((res) => {
        let body = res.body;
        body = JSON.parse(body);
        for (let i = 0; i < body.length; i += 1) {
          expect(body[i]).toBe(product.related[i]);
        }
      });
  });
});

describe('getStyles', () => {
  it('should return styles for a given product id', () => {
    const params = '/styles?product_id=3';
    return frisby.fetch(`${URL}${params}`)
      .expect('status', 200)
      .then((res) => {
        let body = res.body;
        body = JSON.parse(body);
        expect(body.product_id).toBe(3);
        expect(JSON.stringify(body)).toBe(JSON.stringify(product.styles));
      });
  });
});

describe('getFeatures', () => {
  it('should return product features for a given product', () => {
    const params = '/features?product_id=3';
    return frisby.fetch(`${URL}${params}`)
      .expect('status', 200)
      .then((res) => {
        let body = res.body;
        body = JSON.parse(body);
        expect(body.id).toBe(3);
        expect(body.name).toBe(product.features.name);
        expect(body.slogan).toBe(product.features.slogan);
        expect(body.category).toBe(product.features.category);
        expect(body.description).toBe(product.features.description);
        expect(body.default_price).toBe(product.features.default_price);
      });
  });
});
