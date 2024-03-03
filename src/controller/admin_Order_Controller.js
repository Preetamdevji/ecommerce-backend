const orderService = require("../services/order_Service");

const getAllOrders = async (req, resp) => {
  try {
    const orders = await orderService.getAllOrders();
    return resp.status(200).send(orders);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

const confirmOrders = async (req, resp) => {
  let orderId = req.params.orders;
  try {
    const orders = await orderService.confirmedOrder(orderId);
    return resp.status(200).send(orders);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

const shippOrders = async (req, resp) => {
  let orderId = req.params.orders;
  try {
    const orders = await orderService.shippingOrder(orderId);
    return resp.status(200).send(orders);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

const deliveredOrders = async (req, resp) => {
  let orderId = req.params.orders;
  try {
    const orders = await orderService.deliverOrder(orderId);
    return resp.status(200).send(orders);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

const cancelledOrder = async (req, resp) => {
  let orderId = req.params.orders;
  try {
    const orders = await orderService.cancelOrder(orderId);
    return resp.status(200).send(orders);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

const deletedOrder = async (req, resp) => {
  let orderId = req.params.orders;
  try {
    const orders = await orderService.deleteOrder(orderId);
    return resp.status(200).send(orders);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  confirmOrders,
  shippOrders,
  deliveredOrders,
  cancelledOrder,
  deletedOrder,
};
