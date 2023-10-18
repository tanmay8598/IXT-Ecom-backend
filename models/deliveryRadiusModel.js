const mongoose = require("mongoose");

const deliveryRadiusSchema = mongoose.Schema({
  radius: {
    type: String,
    required: true,
  },
  mylocation: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number] },
  },
});

deliveryRadiusSchema.index({ mylocation: "2dsphere" });

const DeliveryRadius = mongoose.model("DeliveryRadius", deliveryRadiusSchema);

module.exports = DeliveryRadius;
