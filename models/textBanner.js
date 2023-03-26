const mongoose = require("mongoose");

const textBannerSchema = mongoose.Schema({
  textDescription: {
    type: String,
    required: true,
  },
});

const TextBanner = mongoose.model("TextBanner", textBannerSchema);

module.exports = TextBanner;
