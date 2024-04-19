const express = require('express');
const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controller/orderController');

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(createOrder);

orderRouter.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder);

exports.orderRouter = orderRouter;
