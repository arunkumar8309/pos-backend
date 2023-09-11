const express = require('express');
const ProductUploadController = require('../controllers/ProductUploadController');
var router = express.Router();
const { CreateProduct } = ProductUploadController;

router.post('/newProductUpload', CreateProduct);

module.exports = router;
