const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const User = require("../models/userModel.js");
const { addRewardPoints } = require("./userRewardController.js");
const UserReward = require("../models/userReward.js");

// @desc    Auth user & get token
// @route   POST /api/users/login
//@access   Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress,
      isDealer: user.isDealer,
      token: generateToken(
        user._id,
        user.name,
        user.email,
        user.shippingAddress,
        user.isDealer
      ),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    User registration
// @route   POST /api/users
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  if (user) {
    const reward = await UserReward.findOne({ user: user._id });
    const amount = req.body?.amount ? req.body.amount : 0;
    if (reward) {
      reward.amount = reward.amount + amount;
      const updatedReward = await reward.save();
    } else {
      const reward = await UserReward.create({
        user: user._id,
        amount,
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isDealer: user.isDealer,
      token: generateToken(
        user._id,
        user.name,
        user.email,
        user.shippingAddress,
        user.isDealer
      ),
    });
  } else {
    res.status(404);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/login
//@access   Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      name: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    // console.log(updatedUser);
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(
        updatedUser._id,
        updatedUser.name,
        updatedUser.email
      ),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isDealer: false });
  res.json(users);
});
const getDealers = asyncHandler(async (req, res) => {
  const users = await User.find({ isDealer: true });
  res.json(users);
});

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.query.id });

  res.json({ message: "User removed" });
});

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const saveShippingAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (user) {
    user.shippingAddress = req.body.shippingAddress || user.shippingAddress;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      shippingAddress: updateUser.shippingAddress,
      token: generateToken(
        updatedUser._id,
        updatedUser.name,
        updatedUser.email,
        updatedUser.shippingAddress,
        updatedUser.isDealer
      ),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const assignDealer = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (user) {
    user.isDealer = true;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const removeDealer = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (user) {
    user.isDealer = false;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateRewardPoints = asyncHandler(async (req, res) => {
  const { userId, balance } = req.body;

  const reward = await UserReward.findOne({ user: userId });
  if (reward) {
    reward.amount = reward.amount + balance;
    const updatedReward = await reward.save();

    res.status(201).json(updatedReward);
  } else {
    res.status(404);
    throw new Error("Reward not found");
  }
});

module.exports = {
  removeDealer,
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  saveShippingAddress,
  assignDealer,
  getDealers,
  updateRewardPoints,
};
