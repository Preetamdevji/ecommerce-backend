const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');
const cartController = require('../controller/cart_Controller.js');

router.get('/', authenticate , cartController.findUsersCart);
router.put('/add', authenticate , cartController.addItemCart);


module.exports = router