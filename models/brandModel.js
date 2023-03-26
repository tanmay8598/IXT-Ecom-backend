const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
