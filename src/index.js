const express = require("express");
const swaggerUI=require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const cors = require("cors");
const app = express();

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerJsDocs));
app.use(express.json());
app.use(cors());

// Route

app.get('/', (req,resp)=>{
   return resp.status(200).send({message : "Welcome to Ecommerce Application -node", status: true});
});

const authRouters = require('./routes/auth_route.js');
app.use('/auth',authRouters);

const userRouters = require('./routes/user_route.js');
app.use('/api/users',userRouters);

const productRouter = require('./routes/product_Route.js')
app.use('/api/products',productRouter);

const adminProductRouter = require('./routes/admin_Product_Route.js')
app.use('/api/admin/products',adminProductRouter);

const cartRouter = require('./routes/carts_Route.js')
app.use('/api/cart',cartRouter);

const cartItemRouter = require('./routes/cartItem_route.js')
app.use('/api/cart_items',cartItemRouter);

const orderRouter = require('./routes/orderRoute.js')
app.use('/api/orders',orderRouter);

const adminOrderRouter = require('./routes/admin_Order_Route.js')
app.use('/api/admin/orders',adminOrderRouter);

const reviewRouter = require('./routes/review_Route.js')
app.use('/api/reviews',reviewRouter);

const ratingRouter = require('./routes/rating_Route.js')
app.use('/api/ratings',ratingRouter);



module.exports = app;
