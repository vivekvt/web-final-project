const { CartModel } = require('../models/cartModel');
const { OrderModel } = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryController');

exports.getAllOrders = factory.getAll(OrderModel);
exports.getOrder = factory.getOne(OrderModel);
exports.updateOrder = factory.updateOne(OrderModel);
exports.deleteOrder = factory.deleteOne(OrderModel);

// exports.createOrder = factory.createOne(OrderModel);
exports.createOrder = catchAsync(async (req, res) => {
  let order = await OrderModel.create(req?.body);
  await CartModel.findOneAndUpdate({ user: req?.body?.user }, { items: [] });
  return res.status(201).json({ order });
});
