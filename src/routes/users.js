const express = require('express');
const userController = require('../controllers/usersController');
var router = express.Router();
const { Insert } = userController;

router.post('/newUser', Insert);

module.exports = router;
