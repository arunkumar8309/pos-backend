// CarouselMaster.js
const express = require('express');
const router = express.Router();
const { getProductData } = require('../controllers/ProductController');

router.get('/api/product-master-data', getProductData);

module.exports = router;
