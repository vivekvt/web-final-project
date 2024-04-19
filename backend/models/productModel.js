const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String], required: true },
    category: { type: [String], required: true },
    stock: { type: Number, required: true },
    shippingCost: { type: Number, required: false },
  },
  { timestamps: true }
);

exports.ProductModel = mongoose.model('Product', productSchema);
