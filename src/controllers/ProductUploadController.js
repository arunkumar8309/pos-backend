const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");
const { ProductData } = require("../models/ProductSchema");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// Set storage engine for Multer
// const storage = multer.diskStorage({
//     destination: './public/uploads/', // Choose your desired destination for uploaded files
//     filename: (req, file, callback) => {
//         callback(
//             null,
//             `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//         );
//     },
// });

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("Product_Img");

const CreateProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to upload image" });
    }

    const existingProduct = await ProductData.findOne({
      Product_Name: req.body.Product_Name,
      Product_Category: req.body.Product_Category,
    });

    console.log("existingProduct", existingProduct);

    if (existingProduct) {
      return res.status(400).json({
        status: "400",
        error: "This Product already Uploaded with this category!",
      });
    }
    const Product_Id_value = generateRandomString(10);

    const {
      Product_Name,
      Product_Category,
      Product_Price,
      Product_Quantity,
      Product_Discount,
      Product_Des,
    } = req.body;

    // const Product_Img = `http://localhost:4002/uploads/${req.file.path}`;
    const image_url = process.env.Upload_Image_Url;
    const image_port = process.env.PORT;
    const Product_Img = `${image_url}:${image_port}/profile/${req.file.filename}`;
    // console.log("image_url", image_url);
    // console.log("image_port", image_port);
    // console.log("final_url", final_url);
    // console.log("req.file.filename", req.file.filename);
    // console.log("req.file.filename", req.file.filename);

    // Create a new product document
    const newProduct = new ProductData({
      Product_Id: Product_Id_value,
      Product_Name,
      Product_Category,
      Product_Price,
      Product_Quantity,
      Product_Discount,
      Product_Des,
      Product_Img,
      Created_At: new Date().toISOString(), // You can format this date as needed
    });
    newProduct
      .save()
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error appropriately, e.g., return an error response to the client
        res.status(500).json({ error: "Failed to save product data" });
      });
  });
  function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
      res.json({
        success: 0,
        message: err.message,
      });
    }
  }
  app.use(errHandler);
};

module.exports = {
  CreateProduct,
};
