const mongoose = require("mongoose");

const deliveryChargeSchema = mongoose.Schema({
  charge: {
    type: String,
    required: true,
  },
  limit: {
    type: String,
    required: true,
  },
});

const DeliveryCharge = mongoose.model("DeliveryCharge", deliveryChargeSchema);

module.exports = DeliveryCharge;
