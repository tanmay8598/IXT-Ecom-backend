const mongoose = require("mongoose");

const themeSchema = mongoose.Schema({
 
  firstcolor: {
    type: String,
    required: true,
  },
  secondcolor: {
    type: String,
    required: true,
  },
  thirdcolor: {
    type: String,
    required: true,
  },
  fourthcolor: {
    type: String,
    required: true,
  },
});

const Theme = mongoose.model("Theme", themeSchema);

module.exports = Theme;
