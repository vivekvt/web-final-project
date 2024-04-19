const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/userModel');
const factory = require('./factoryController');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = factory.getAll(UserModel);
exports.getUser = factory.getOne(UserModel);
exports.createUser = factory.createOne(UserModel);
exports.updateUser = factory.updateOne(UserModel);
exports.deleteUser = factory.deleteOne(UserModel);

exports.signup = catchAsync(async (req, res) => {
  const { name, email, password, address } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    address,
  });
  await newUser.save();
  res.status(201).json({ message: 'Signup successful' });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  let user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  user = user.toObject();
  delete user.password;

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ message: 'Login successful', user, token });
});

exports.getUserProfile = catchAsync(async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the userId from the decoded token
    const userId = decoded.userId;

    // Fetch user data based on the userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});
