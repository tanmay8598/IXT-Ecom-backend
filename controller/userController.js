const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const User = require("../models/userModel.js");
const { addRewardPoints } = require("./userRewardController.js");
const UserReward = require("../models/userReward.js");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const { parseISO } = require("date-fns");
const Order = require("../models/orderModel.js");

// @desc    User registration
// @route   POST /api/users
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
  const { phone, verificationCode } = req.body;

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

const checkUser = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ phone: req.query.phone });

  if (userExists) {
    res.status(201).json({ message: "user found" });
  } else {
    res.status(401).json({ message: "user not found" });
  }
});

const downloadCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ isDealer: false }).select(
    "-password -pushToken -verificationCode"
  );

  res.json(customers);
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
  const pageSize = 40;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.countDocuments({ isDealer: false });
  var pageCount = Math.floor(count / 40);
  if (count % 40 !== 0) {
    pageCount = pageCount + 1;
  }
  const users = await User.find({ isDealer: false })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, pageCount, count });
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

const getTopCustomers = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const s1 = startOfDay(parseISO(startDate));
  const s2 = endOfDay(parseISO(endDate));

  const sort = {
    $sort: {
      sum: -1,
    },
  };
  const limit = {
    $limit: 20,
  };

  const match_stage = {
    $match: {
      createdAt: { $gte: s1, $lte: s2 },
    },
  };

  const group_stage = {
    $group: {
      _id: "$user",
      count: {
        $sum: 1,
      },
    },
  };
  const group_stage2 = {
    $group: {
      _id: null,
      top_users: {
        $push: { _id: "$_id", sum: "$count" },
      },
    },
  };
  const pipeline = [match_stage, group_stage, sort, limit, group_stage2];
  const topSelling = await Order.aggregate(pipeline);

  if (topSelling.length !== 0) {
    const bestusers = await User.find({
      _id: { $in: topSelling[0]?.top_users },
    }).select("_id name phone shippingAddress.email ");

    const users = bestusers.map((item, index) => {
      for (i = 0; i < topSelling[0]?.top_users.length; i++) {
        if (topSelling[0].top_users[i]._id.equals(item._id)) {
          return {
            _id: item._id,
            name: item.name,
            phone: item.phone,
            sum: topSelling[0].top_users[i].sum,
          };
        }
      }
    });

    res.json(users);
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { phone, verificationCode, name } = req.body;

  const userExists = await User.findOne({ phone: phone });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      phone,
      verificationCode,
      name: name ? name : "New User",
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

module.exports = {
  createUser,
  getTopCustomers,
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
  checkUser,
  downloadCustomers,
};
