const mongoose = require("mongoose");

const flavourSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
});

const Flavour = mongoose.model("Flavour", flavourSchema);

module.exports = Flavour;
