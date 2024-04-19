const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.ObjectId, required: true, ref: 'Product' },
    user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    rating: { type: Number, required: true },
    images: { type: [String] },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

exports.CommentModel = mongoose.model('Comment', commentSchema);
