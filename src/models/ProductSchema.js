
const mongoose = require('mongoose');

const ProductDataSchema = new mongoose.Schema(
    [
        {
            Product_Id: { type: String, unique: true },
            Product_Name: String,
            Product_Category: String,
            Product_Price: Number,
            Product_Quantity: Number,
            Product_Discount: Number,
            Product_Des:String,
            Product_Img: String,
            Created_At: String,
        }
    ]
);

const ProductData = mongoose.model('ProductMaster', ProductDataSchema);

module.exports = {
    ProductData,
};

