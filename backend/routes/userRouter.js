const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  signup,
  login,
  getUserProfile,
} = require('../controller/userController');

const userRouter = express.Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);
userRouter.route('/profile').get(getUserProfile);
userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

exports.userRouter = userRouter;
