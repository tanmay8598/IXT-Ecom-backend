const mongoose = require("mongoose");

const coupenSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  usedBy: [
    {
      type: String,
    },
  ],
  count: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    required: true,
  },
});

const Coupen = mongoose.model("Coupen", coupenSchema);

module.exports = Coupen;
