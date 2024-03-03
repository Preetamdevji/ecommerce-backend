const cartItemService = require("../services/cartItem_Service.js");

const updatedCartItem = async (req, resp) => {
  let user = await req.user;
  // console.log("user", user);
  try {
    const updateCartItems = await cartItemService.updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    return resp.status(200).send(updateCartItems)
  } catch (error) {
    return resp.status(500).send({error:error.message})
  }
};

const removedCartItem = async (req, resp) => {
    let user = await req.user;
  
    try {
        await cartItemService.removeCartItem(
        user._id,
        req.params.id
      );
      return resp.status(200).send({message: 'cart item removed successfully'})
    } catch (error) {
      return resp.status(500).send({error:error.message})
    }
  };

  module.exports = {
    updatedCartItem,
    removedCartItem
}