const mongoose = require("mongoose");

const categoryBannerSchema = mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  SpecialCategory: [
    {
      type: mongoose.Schema.Types.Number,
      ref: "SpecialCategory",
    },
  ],
  Category: [
    {
      type: mongoose.Schema.Types.Number,
      ref: "Category",
    },
  ],

  product: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Product",
    },
  ],

  subcategory: [
    {
      type: mongoose.Schema.Types.Number,
      ref: "SubCategory",
    },
  ],
});

const CategoryBanner = mongoose.model("CategoryBanner", categoryBannerSchema);

module.exports = CategoryBanner;
