const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
