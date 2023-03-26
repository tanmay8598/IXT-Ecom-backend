const mongoose = require("mongoose");

const sizeSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
});

const Size = mongoose.model("Size", sizeSchema);

module.exports = Size;
