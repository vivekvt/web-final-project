const express = require('express');
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require('../controller/productController');
const { ProductModel } = require('../models/productModel');

const productRouter = express.Router();

productRouter.route('/').get(getAllProducts).post(createProduct);

productRouter
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

exports.productRouter = productRouter;
