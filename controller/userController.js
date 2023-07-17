const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const User = require("../models/userModel.js");
const { addRewardPoints } = require("./userRewardController.js");
const UserReward = require("../models/userReward.js");

// @desc    User registration
// @route   POST /api/users
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
  const { phone, verificationCode } = req.body;
  // console.log(phone);
  // if (phone == "5555555555") {
  //   console.log("first");
  // }

  const userExists = await User.findOne({ phone: phone });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      phone,
      verificationCode,
      name: "New User",
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
        code: user.verificationCode,
        mobile: user.phone,
      });
    } else {
      res.status(404);
      throw new Error("Invalid user data");
    }
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phoneNo || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    // console.log(updatedUser);
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(
        updatedUser._id,
        updatedUser.phone,
        updatedUser.shippingAddress,
        updatedUser.isDealer,
        updatedUser.name
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
  console.log("delete hit");
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

    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,

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
    // console.log(updatedUser);
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      shippingAddress: updateUser.shippingAddress,
      token: generateToken(
        updatedUser._id,
        updatedUser.phone,
        updatedUser.shippingAddress,
        updatedUser.isDealer,
        updatedUser.name
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

const clearVerificationCode = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    user.verificationCode = "";

    const updatedUser = await user.save();

    res.status(201).json({
      user: updatedUser,
      token: generateToken(
        user._id,
        user.phone,
        user.shippingAddress,
        user.isDealer,
        user.name
      ),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateOTPLogin = asyncHandler(async (req, res) => {
  const { phone, verificationCode } = req.body;

  const user = await User.findOne({ phone });

  if (user) {
    user.verificationCode = verificationCode;

    const updatedUser = await user.save();

    res.status(201).json({
      _id: updatedUser._id,
      code: updatedUser.verificationCode,
      mobile: updatedUser.phone,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  removeDealer,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  saveShippingAddress,
  assignDealer,
  getDealers,
  updateRewardPoints,
  clearVerificationCode,
  updateOTPLogin,
};
