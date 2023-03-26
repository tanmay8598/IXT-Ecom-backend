const asyncHandler = require("express-async-handler");

const UserReward = require("../models/userReward");

const addRewardPoints = asyncHandler(async (req, res, user) => {
  const reward = await UserReward.findOne({ user: user._id });
  const amount = req.body?.amount ? req.body.amount : 0;
  if (reward) {
    reward.amount = reward.amount + amount;
    const updatedReward = await reward.save();
    res.json(updatedReward);
  } else {
    const reward = await UserReward.create({
      user,
      amount,
    });
    res.json(reward);
  }
});

const getRewardPoints = asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  const reward = await UserReward.findOne({ user: userId });

  if (reward) {
    res.json(reward);
  } else {
    res.json("Not Found");
  }
});

const updateRewardPoints = asyncHandler(async (req, res) => {
  const { user, amount } = req.body;
  const reward = await UserReward.findOne({ user: user._id });

  if (reward) {
    reward.amount = reward.amount + amount;
    const updatedReward = await reward.save();
    res.json(updatedReward);
  } else {
    res.json("Not Found");
  }
});

const removeRewardPoints = asyncHandler(async (req, res) => {
  const { user, amount } = req.body;
  const reward = await UserReward.findOne({ user: user._id });

  if (reward) {
    reward.amount = reward.amount - amount;
    const updatedReward = await reward.save();
    res.json(updatedReward);
  } else {
    res.json("Not Found");
  }
});

module.exports = {
  addRewardPoints,
  getRewardPoints,
  updateRewardPoints,
  removeRewardPoints,
};
