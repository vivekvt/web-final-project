const express = require('express');
const {
  getAllCarts,
  createCart,
  getCart,
  updateCart,
  deleteCart,
  updateUserCart,
  getUserCart,
} = require('../controller/cartController');

const cartRouter = express.Router();

cartRouter.route('/').get(getAllCarts).post(createCart);
cartRouter.route('/user').put(updateUserCart);
cartRouter.route('/user/:userId').get(getUserCart);

cartRouter.route('/:id').get(getCart).put(updateCart).delete(deleteCart);

exports.cartRouter = cartRouter;
