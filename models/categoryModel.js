const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  banner: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
