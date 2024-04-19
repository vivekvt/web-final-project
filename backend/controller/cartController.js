const { CartModel } = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryController');

exports.getAllCarts = factory.getAll(CartModel);
exports.getCart = factory.getOne(CartModel);
exports.createCart = factory.createOne(CartModel);
exports.updateCart = factory.updateOne(CartModel);
exports.deleteCart = factory.deleteOne(CartModel);

exports.updateUserCart = catchAsync(async (req, res) => {
  const { items, user } = req.body;
  console.log(req?.body);
  let cart = await CartModel.findOne({ user: user?._id });

  if (!cart) {
    const newCart = (
      await CartModel.create({ items, user: user?._id })
    ).populate('items.product');
    return res.status(200).json({ cart: newCart });
  }

  cart.items = items;
  await cart.save();
  return res.status(200).json({ cart });
});

exports.getUserCart = catchAsync(async (req, res) => {
  const userId = req.params?.userId;
  let newCart = [];
  let cart = await CartModel.findOne({ user: userId }).populate(
    'items.product'
  );

  if (cart?._id) {
    newCart = cart?.items;
  }

  return res.status(200).json({ cart: newCart });
});
