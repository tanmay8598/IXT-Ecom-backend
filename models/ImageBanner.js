const mongoose = require("mongoose");

const imageBannerSchema = mongoose.Schema({
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
});

const ImageBanner = mongoose.model("ImageBanner", imageBannerSchema);

module.exports = ImageBanner;
