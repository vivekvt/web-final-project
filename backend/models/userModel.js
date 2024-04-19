const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressLine: { type: String, default: '' },
  city: { type: String, default: '' },
  zipcode: { type: String, default: '' },
  province: { type: String, default: '' },
  country: { type: String, default: '' },
});
exports.addressSchema = addressSchema;
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    purchaseHistory: { type: String },
    address: {
      type: addressSchema,
      default: {
        addressLine: '',
        city: '',
        zipcode: '',
        province: '',
        country: '',
      },
    },
  },
  { timestamps: true }
);

exports.UserModel = mongoose.model('User', userSchema);
