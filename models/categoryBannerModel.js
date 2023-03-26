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
      required: true,
      ref: "SpecialCategory",
    },
  ],
});

const CategoryBanner = mongoose.model("CategoryBanner", categoryBannerSchema);

module.exports = CategoryBanner;
