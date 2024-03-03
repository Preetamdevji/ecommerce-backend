const Rating = require("../model/rating_model");
const product_service = require("../services/product_service");


const createRating = async (reqData,user)=>{
        const product = await product_service.findProductById(reqData.productId);
        const rating = new Rating({
            user:user._id,
            product:product._id,
            rating:reqData.rating,
            createdAt:new Data()
        });

        return await rating.save();

}

const getProductRating = async(productId)=>{
    return await Rating.find({product:productId}).populate('user')
}

module.exports = {
    createRating,
    getProductRating
}