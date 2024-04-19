const mongoose = require('mongoose');
const { addressSchema } = require('./userModel');
const { itemSchema } = require('./cartModel');

const creditCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  expiry: { type: String, required: true },
  cvc: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    items: { type: [itemSchema], required: true },
    creditCard: { type: creditCardSchema, required: true },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true }
);

exports.OrderModel = mongoose.model('Order', orderSchema);
