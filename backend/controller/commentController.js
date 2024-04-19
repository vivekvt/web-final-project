const { CommentModel } = require('../models/commentModel');
const factory = require('./factoryController');

exports.getAllComments = factory.getAll(CommentModel);
exports.getComment = factory.getOne(CommentModel);
exports.createComment = factory.createOne(CommentModel);
exports.updateComment = factory.updateOne(CommentModel);
exports.deleteComment = factory.deleteOne(CommentModel);
