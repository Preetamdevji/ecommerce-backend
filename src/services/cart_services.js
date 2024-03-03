const Cart = require('../model/cart_model.js');
const CartItem = require('../model/cartitems_model.js');
const Product = require('../model/product_model.js')

const createCart = async(user)=>{
        try {
            const cart = new Cart({user});
            const createdCart = await cart.save();
            return createdCart;
        } catch (error) {
            throw new Error(error.message);
        }
};

const findUserCart = async(user)=>{
        try {
            let cart = await Cart.findOne({user:user._id});
            let cartItems = await CartItem.find({cart:cart._id}).populate('products')

            cart.cartItems = cartItems;

            let totalPrice = 0;
            let totalDiscountPrice = 0;
            let totalItem = 0;


            for(let cartItems of cart.cartItems){
                totalPrice+= cartItems.price;
                totalDiscountPrice+= cartItems.discountPrice;  
                totalItem += cartItems.quantity; 
            }

            cart.totalPrice = totalPrice;
            cart.discount = totalPrice - totalDiscountPrice;
            cart.totalItems = totalItem;
            // console.log(cart);
            return cart;
        } catch (error) {
            throw new Error(error.message)
        }
}

// const addCartItem = async (userId,req)=>{
//     try {
//         let cart = await Cart.findOne({user:userId});
//         let products = await Product.findById(req.productId);

//         let isPresent = await CartItem.find({cart:cart._id,products:products._id,userId});
//         if(!isPresent){
//             const cartItem = new CartItem({
//                 products : products._id,
//                 cart : cart._id,
//                 userId,
//                 quantity : 1,
//                 price : products.price,
//                 size : req.size,
//                 discountPrice : products.discountedPrice
//             })
//             const createdCartItem = await cartItem.save();
//             cart.cartItems.push(createdCartItem);
//             await cart.save();
//             return "Item Added To Cart";
//         }
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

const addCartItem = async (userId, req) => {
    try {
        let cart = await Cart.findOne({ user: userId });
        let products = await Product.findById(req.productId);

        let isPresent = await CartItem.findOne({ cart: cart._id, products: products._id, userId });

        if (isPresent) {
            return "Item already present in the cart.";
        } else {
            const cartItem = new CartItem({
                products: products._id,
                cart: cart._id,
                userId,
                quantity: 1,
                price: products.price,
                size: req.size,
                discountPrice: products.discountedPrice,
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "Item Added To Cart";
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {createCart,findUserCart,addCartItem};