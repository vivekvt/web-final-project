const { ProductModel } = require('./../models/productModel');
const factory = require('./factoryController');

exports.getAllProducts = factory.getAll(ProductModel);
exports.getProduct = factory.getOne(ProductModel);
exports.createProduct = factory.createOne(ProductModel);
exports.updateProduct = factory.updateOne(ProductModel);
exports.deleteProduct = factory.deleteOne(ProductModel);
