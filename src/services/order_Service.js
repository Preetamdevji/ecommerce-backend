const cartService = require("../services/cart_services.js");
const Address = require("../model/address_model.js");
const Order = require("../model/order_model.js");
const OrderItem = require("../model/orderItems.js")

const createOrder = async (user, shippingAddress) => {
  let address = [];
  if (shippingAddress._id) {
    let addressExist = await Address.findById(shippingAddress._id);
    address = addressExist;
  } else {
    address = new Address(shippingAddress);
    address.user = user;
    await address.save();
    user.address.push(address);
    // console.log("anywork", user.address);
    await user.save();
    
  }
    
  
  let cart = await cartService.findUserCart(user._id);
  let orderItems = [];

  for (let item of cart.cartItems) {
    let orderItem = new OrderItem({
      price: item.price,
      product: item.products,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountPrice: item.discountPrice,    
    });
        // console.log(item.price,item.quantity,item.size,item.userId,item.discountPrice);
    let createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
    // console.log(createdOrderItem);
  }
  let CreatedOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountPrice: cart.totalDiscountPrice,
    discount: cart.discount,
    totalItems: cart.totalItems,
    shippingAddress: address,
  });

  let orderSaved = await CreatedOrder.save();
  // console.log(user,orderItems,cart.totalPrice);
  // console.log(orderSaved);
  return orderSaved;
};

async function placeOrder(orderId) {
  let order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
}

async function confirmedOrder(orderId) {
  let order = await findOrderById(orderId);

  order.orderStatus = "COMFIRMED";
  return await order.save();
}

async function shippingOrder(orderId) {
  let order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";
  return await order.save();
}

async function deliverOrder(orderId) {
  let order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";
  return await order.save();
}

async function cancelOrder(orderId) {
  let order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";
  return await order.save();
}

async function findOrderById(orderId) {
  let order = await Order.findById(orderId)
    .populate("users")
    .populate({ path: "orderItems", populate: { path: "products" } })
    .populate("shippingAddress");

  return order;
}

async function userOrderHistory() {
  try {
    let orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "products" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "products" } })
    .lean();
}

async function deleteOrder(orderId) {
  let order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shippingOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
