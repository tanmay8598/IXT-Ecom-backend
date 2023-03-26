const mongoose = require("mongoose");

const colorSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
});

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;
