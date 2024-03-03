const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"cart",
        required:true
    }],
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true
    }],
    size:{
        type: String,
        required:true
    },
    quantity:{
        type: Number,
        required:true,
        default: 1
    },
    price:{
        type: Number,
        required:true,
    },
    discountPrice:{
        type: Number,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
});

const CartItem = mongoose.model("cartItems",cartItemsSchema);
module.exports = CartItem;