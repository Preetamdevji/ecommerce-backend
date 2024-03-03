const mongoose = require("mongoose");

const mongoDbUrl = "mongodb+srv://preetamdevji123:rXHneZ7AbHzV1R50@cluster0.mgpcy8x.mongodb.net/?retryWrites=true&w=majority";

const connectDB = ()=>{
    return mongoose.connect(mongoDbUrl);
}

module.exports =  {connectDB};