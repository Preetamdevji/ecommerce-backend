const express = require('express');
const router = express.Router();
const cartItem = require('../controller/cart_Item_Controller.js');
const authenticate = require('../middleware/authenticate.js');

router.put('/:id', authenticate , cartItem.updatedCartItem);
router.delete('/:id', authenticate , cartItem.removedCartItem);

module.exports = router