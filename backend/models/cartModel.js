const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true },
});

exports.itemSchema = itemSchema;

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
    },
    items: [itemSchema],
  },
  { timestamps: true }
);

exports.CartModel = mongoose.model('Cart', cartSchema);
