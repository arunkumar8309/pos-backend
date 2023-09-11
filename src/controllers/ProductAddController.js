const newProductAdd = require("../models/ProductAddSchema");
const { ProductData } = require('../models/ProductSchema');

const ProductAddController = {};

ProductAddController.Insert = async (req, res) => {
    console.log("post api hit", req.body);
    console.log("req.body.Email:", req.body.Email);

    try {
        // Step 1: Find the product by Product_Id
        const getDataProductMaster = await ProductData.findOne({ Product_Id: req.body.Product_Id });
        console.log("getDataProductMaster", getDataProductMaster)

        if (!getDataProductMaster) {
            return res.status(400).json({ status: "400", error: "Product not found!" });
        }

        // Step 2: Check for duplicates
        const existingProduct = await newProductAdd.findOne({
            Email: req.body.Email,
            Product_Name: getDataProductMaster.Product_Name,
            Product_Category: getDataProductMaster.Product_Category,
        });

        if (existingProduct) {
            return res.status(400).json({ status: "400", error: "This Product already added!" });
        }

        // Step 3: Save the new product
        const newProductData = {
            ...getDataProductMaster.toObject(),
            Email: req.body.Email,
        };

        const newProduct = new newProductAdd(newProductData);
        await newProduct.save();

        res.status(200).json({ status: "200", message: "Product Add Successful!" });
    } catch (error) {
        // Handle other errors
        console.error(error);
        res.status(500).json({ status: "500", error: "Error occurred while saving user data" });
    }
};

// Create delete API 
ProductAddController.Delete = async (req, res) => {
    const Product_Id = req.query.Product_Id;
    console.log("Product_Id", Product_Id);


    try {
        if (Product_Id) {
            // Delete a single product by Product_Id
            const productToDelete = await newProductAdd.findOneAndDelete({ Product_Id });

            if (!productToDelete) {
                // Product not found
                return res.status(404).json({ status: "404", error: "Product not found" });
            }

            // Product deleted successfully
            return res.status(200).json({ status: "200", message: "Product deleted successfully" });
        } else {
            // Delete all products
            const deleteResult = await newProductAdd.deleteMany({});

            if (deleteResult.deletedCount === 0) {
                // No products to delete
                return res.status(404).json({ status: "404", error: "No products found" });
            }

            // All products deleted successfully
            return res.status(200).json({ status: "200", message: "All products deleted successfully" });
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ status: "500", error: "Error occurred while deleting the product(s)" });
    }
};

// Create Update API 

ProductAddController.Update = async (req, res) => {
    const Product_Id = req.query.Product_Id;
 
    try {
        if (Product_Id) {
            // Find the product by Product_Id
            const productToUpdate = await newProductAdd.findOne({ Product_Id });

            if (!productToUpdate) {
                // Product not found
                return res.status(404).json({ status: "404", error: "Product not found" });
            }

            if (req.body.Product_Name) {
                productToUpdate.Product_Name = req.body.Product_Name;
            }
            if (req.body.Product_Category) {
                productToUpdate.Product_Category = req.body.Product_Category;
            }
            if (req.body.Product_Price) {
                productToUpdate.Product_Price = req.body.Product_Price;
            }
            if (req.body.Product_Des) {
                productToUpdate.Product_Des = req.body.Product_Des;
            }
            if (req.body.Product_Quantity) {
                productToUpdate.Product_Quantity = req.body.Product_Quantity;
            }
            if (req.body.Product_Img) {
                productToUpdate.Product_Img = req.body.Product_Img;
            }
            if (req.body.Product_Discount) {
                productToUpdate.Product_Discount = req.body.Product_Discount;
            }

            // Save the updated product
            await productToUpdate.save();
        } else {
            // Update all products
            const updateResult = await newProductAdd.updateMany({}, { $set: { Product_Discount: req.body.Product_Discount } });

            if (updateResult.nModified === 0) {
                // No products updated
                return res.status(404).json({ status: "404", error: "No products updated" });
            }

            // All products updated successfully
            return res.status(200).json({ status: "200", message: "All products updated successfully" });
        }
        // Product updated successfully
        return res.status(200).json({ status: "200", message: "Product updated successfully" });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ status: "500", error: "Error occurred while updating the product" });
    }

};

//  Create Get API

ProductAddController.Getapi = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await newProductAdd.find({});

        if (products.length === 0) {
            // No products found, return a message
            return res.status(404).json({ status: "404", message: "No products found" });
        }

        // Return the products as a JSON response
        return res.status(200).json({ status: "200", products });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ status: "500", error: "Error occurred while fetching products" });
    }

};

module.exports = ProductAddController;
