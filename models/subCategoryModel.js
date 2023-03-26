const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
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

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
