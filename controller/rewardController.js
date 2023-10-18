const asyncHandler = require("express-async-handler");
const Reward = require("../models/rewardModel");

const updateReward = asyncHandler(async (req, res) => {
   const {active, ratio, redeemPercent} = req.body
   const exists = await Reward.findOne();
 
   if (exists) {
    exists.active = active
    exists.ratio = ratio ? ratio : exists.ratio
    exists.redeemPercent = redeemPercent ? redeemPercent : exists.redeemPercent

    const updatedReward = await exists.save();
    res.json(updatedReward);
   } else {
    const reward = await Reward.create({active, ratio, redeemPercent})
    res.json({reward})
   }
  });

  const getReward = asyncHandler(async(req, res) => {
    const reward = await Reward.findOne()
    res.json({reward})
  })


  module.exports = {updateReward, getReward}