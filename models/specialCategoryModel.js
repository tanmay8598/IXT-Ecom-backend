const mongoose = require("mongoose");

const specialCategorySchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.Number,
    required: true,
    ref: "Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.Number,
    required: true,
    ref: "SubCategory",
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

const SpecialCategory = mongoose.model(
  "SpecialCategory",
  specialCategorySchema
);

module.exports = SpecialCategory;
