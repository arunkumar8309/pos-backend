const express = require('express');
const ProductAddController = require('../controllers/ProductAddController');
var router = express.Router();
const { Insert, Delete, Update, Getapi } = ProductAddController;

router.post('/product-add-to-cart', Insert);

router.delete('/product-delete', Delete);

router.put('/product-update', Update);

router.get('/card-product-get', Getapi);

module.exports = router;
