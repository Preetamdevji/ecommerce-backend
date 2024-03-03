const reviewService = require('../services/review_Service');

const createReview = async(req,resp)=>{
    let user = req.user
    try {
        const review = await reviewService.createReview(req.body,user);
        return resp.status(201).send(review);
    } catch (error) {
        return resp.status(500).send({ error: error.message });
    }
}

const getAllReview = async(req,resp)=>{
    let productId = req.params.productId
    let user = req.user
    try {
        const reviews = await reviewService.getAllReview(productId);
        return resp.status(201).send(reviews);
    } catch (error) {
        return resp.status(500).send({ error: error.message });
    }
}

module.exports = {
    createReview,
    getAllReview
}