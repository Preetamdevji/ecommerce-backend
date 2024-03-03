const express = require('express');
const router = express.Router();
const adminProductRoute = require('../controller/product_Controller.js');
const authenticate = require('../middleware/authenticate.js');



router.post('/', authenticate , adminProductRoute.createProduct);
router.post('/creates', authenticate , adminProductRoute.createMultipleProduct);
router.put('/:id', authenticate , adminProductRoute.updatedProduct);
router.delete('/:id', authenticate , adminProductRoute.deleteProduct);

module.exports = router