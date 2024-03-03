const express = require('express');
const router = express.Router();
const productRoute = require('../controller/product_Controller.js');
const authenticate = require('../middleware/authenticate.js');

router.get("/", authenticate,productRoute.getAllProducts);
router.get("/id/:id", authenticate,productRoute.findProductById);


module.exports = router