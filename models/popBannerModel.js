const mongoose = require("mongoose");

const PopBannerSchema = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  bg: {
    type: String,
  },
  link: {
    type: String,
  },
  productId: {
    type: String,
  },
  categoryId: {
    type: String,
  },
  subCategoryId: {
    type: String,
  },
  specialCategoryId: {
    type: String,
  },
});

const PopBanner = mongoose.model("PopBanner", PopBannerSchema);

module.exports = PopBanner;
