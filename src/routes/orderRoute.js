const express = require('express');
const router = express.Router();
const orderRoute = require('../controller/order_Controller.js');
const authenticate = require('../middleware/authenticate.js');


router.post('/',authenticate,orderRoute.createOrder);
router.get('/:id',authenticate,orderRoute.findOrdersById);
router.get('/user',authenticate,orderRoute.orderHistory);

module.exports = router