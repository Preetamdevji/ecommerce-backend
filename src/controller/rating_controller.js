const ratingService = require("../services/rating_Service");

const createRating = async (req, resp) => {
  let user = req.user;
  try {
    const rating = await ratingService.createRating(req.body, user);
    resp.status(201).send(rating);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

const getProductRating = async (req, resp) => {
  let productId = req.params.productId;
  let user = req.user;
  try {
    const ratings = await ratingService.getProductRating(productId);
    resp.status(201).send(ratings);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

module.exports = {
  createRating,
  getProductRating,
};
