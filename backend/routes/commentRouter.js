const express = require('express');
const {
  getAllComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require('../controller/commentController');

const commentRouter = express.Router();

commentRouter.route('/').get(getAllComments).post(createComment);

commentRouter
  .route('/:id')
  .get(getComment)
  .put(updateComment)
  .delete(deleteComment);

exports.commentRouter = commentRouter;
