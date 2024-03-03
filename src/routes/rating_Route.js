const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');
const ratingController = require('../controller/rating_controller.js');

router.post('/create', authenticate , ratingController.createRating);
router.put('/product/:productId', authenticate , ratingController.getProductRating);

module.exports = router