const mongoose = require("mongoose");

const rewardSchema = mongoose.Schema(
  { 
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    ratio: {
        type: Number,
        requuired: true
    },
    redeemPercent: {
        type: Number,
        requuired: true
    }
  }
);

const Reward = mongoose.model("Reward", rewardSchema);

module.exports = Reward;
