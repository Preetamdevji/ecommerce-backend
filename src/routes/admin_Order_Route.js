const express = require('express');
const router = express.Router();
const adminOrder = require('../controller/admin_Order_Controller.js');
const authenticate = require('../middleware/authenticate.js');


router.get('/', authenticate , adminOrder.getAllOrders);
router.put('/:orderId/confirmed',authenticate,adminOrder.confirmOrders)
router.put('/:orderId/ship',authenticate,adminOrder.shippOrders)
router.put('/:orderId/deliver',authenticate,adminOrder.deliveredOrders)
router.put('/:orderId/cancel',authenticate,adminOrder.cancelledOrder)
router.delete('/:orderId/delete',authenticate,adminOrder.deletedOrder)

module.exports = router