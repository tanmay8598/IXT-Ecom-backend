const mongoose = require("mongoose");

const subBrandSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.Number,
    required: true,
    ref: "Brand",
  },
  photo: {
    type: String,
  },
});

const SubBrand = mongoose.model("SubBrand", subBrandSchema);

module.exports = SubBrand;
