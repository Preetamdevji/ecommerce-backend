const orderService = require("../services/order_Service.js");

const createOrder = async (req, resp) => {
  let user = await req.user;

  try {
    const createdOrder = await orderService.createOrder(user, req.body);
    return resp.status(201).send(createdOrder);
    // console.log(createdOrder);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

const findOrdersById = async (req, resp) => {
    let user = await req.user;
  
    try {
      const createdOrder = await orderService.findOrderById(req.params.id);
      return resp.status(200).send(createdOrder);
    } catch (error) {
      return resp.status(500).send({ error: error.message });
    }
  };

  const orderHistory = async (req, resp) => {
    let user = await req.user;
  
    try {
      const createdOrder = await orderService.userOrderHistory(user._id);
      return resp.status(200).send(createdOrder);
    } catch (error) {
      return resp.status(500).send({ error: error.message });
    }
  };

  module.exports = {
    createOrder,
    findOrdersById,
    orderHistory
  }