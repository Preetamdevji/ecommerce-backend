const mongoose = require("mongoose");
const {Schema} = mongoose

const orderSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'orderItems'
    }],
    orderDate:{
        type:Date,
        required:true,
        default: Date.now()
    },
    deliveryDate:{
        type:Date,
        
    },
    shippingAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addresses'
    },
    paymentDetails: {
        paymentMethod:{
            type:String
        },
        transitionId:{
            type:String
        },
        paymentId:{
            type:String
        },
        paymentStatus:{
            type:String,
            default:"PENDING"
        }
    },
    totalPrice:{
        type: Number,
        required:true,
    },
    totalDiscountPrice:{
        type: Number,
        required:true,
    },
    discount:{
        type: Number,
        required:true,
    },
    orderStatus:{
        type: String,
        required:true,
        default:"PENDING"
    },
    totalItems:{
        type: String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now() 
    }
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order