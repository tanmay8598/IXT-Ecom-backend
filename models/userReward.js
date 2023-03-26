const mongoose = require("mongoose");

const userRewardSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserReward = mongoose.model("UserReward", userRewardSchema);

module.exports = UserReward;
