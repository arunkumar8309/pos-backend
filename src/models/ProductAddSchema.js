
const mongoose = require('mongoose');

const ProductAddSchema = new mongoose.Schema({
  Created_At: { type: Date, default: Date.now },
  Email: { type: String, required: true}, // Email is not unique
  Product_Id: { type: String, required: true},
  Product_Name: { type: String},
  Product_Category: { type: String},
  Product_Price: { type: Number},
  Product_Discount: { type: Number},
  Product_Des: { type: String},
  Product_Quantity: { type: Number},
  Product_Img: { type: String},
});

const newProductAdd = mongoose.model('ProductAdd', ProductAddSchema);

module.exports = newProductAdd;


