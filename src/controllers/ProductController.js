const { ProductData } = require('../models/ProductSchema');

const getProductData = async (req, res) => {
    try {
        const { Product_Category, Product_Name } = req.query;

        if (Product_Category && Product_Name) {
            // Case 1: Both Product_Category and Product_Name are provided
            const productData = await ProductData.find({
                Product_Category: { $regex: new RegExp(Product_Category, 'i') },
                Product_Name: { $regex: new RegExp(Product_Name, 'i') },
            });
            if (productData) {
                res.status(200).json({ status: 200, result: productData });
            } else {
                res.status(404).json({ status: 404, error: 'Product not found' });
            }
        } else if (Product_Category) {
            // Case 2: Only Product_Category is provided
            const productData = await ProductData.find({
                Product_Category: { $regex: new RegExp(Product_Category, 'i') },
            });
            res.status(200).json({ status: 200, result: productData });
        } else if (Product_Name) {
            // Case 3: Only Product_Name is provided
            const productData = await ProductData.find({
                Product_Name: { $regex: new RegExp(Product_Name, 'i') },
            });
            res.status(200).json({ status: 200, result: productData });
        } else {
            // Case 4: No parameters provided, return all data
            const allProductData = await ProductData.find();
            res.status(200).json({ status: 200, result: allProductData });
        }
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ status: 500, error: 'Server error' });
    }
};

module.exports = {
    getProductData,
};
