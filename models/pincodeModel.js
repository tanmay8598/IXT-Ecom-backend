const mongoose = require("mongoose");

const pincodeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  area: [
    {
      name: { type: String },
    },
  ],
});

const Pincode = mongoose.model("Pincode", pincodeSchema);

module.exports = Pincode;
