const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    ZipCode:{
        type:Number,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    }
});

const Address = mongoose.model("addresses",AddressSchema);
module.exports = Address;