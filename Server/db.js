const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/SDCDB');

const productSchema = mongoose.Schema({
  productID: Number,
  title: String,
  slogan: String,
  campus: String,
  created_at: String,
  updated_at: String,
  description: String,
  category: String,
  features: [{
    feature: String,
    value: String,
  }]
  styles: [{
    default: Boolean,
    styleID: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    photos: [{
      url: String,
      thumbnail_url: String,
    }],
    skus: [{
      skuID: Number,
      quantity: Number,
      size: String
    }]
  }],
  ratings:[Number],
  relatedIDS:[Number],
})
const productModel = mongoose.model('Product', productSchema);

