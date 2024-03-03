const cartService = require('../services/cart_services.js');

const findUsersCart = async(req,resp)=>{
    
    try {
        let user = req.user;
        const cart = await cartService.findUserCart(user._id);
        return resp.status(200).send(cart)
    } catch (error) {
        return resp.status(500).send({error:error.message})
    }
}

const addItemCart = async(req,resp)=>{
    
    try {
        let user = req.user;
        const cartItem = await cartService.addCartItem(user._id,req.body);
        return resp.status(200).send(cartItem)
    } catch (error) {
        return resp.status(500).send({error:error.message})
    }
}

module.exports = {
    findUsersCart,
    addItemCart
}