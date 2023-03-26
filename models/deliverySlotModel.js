const mongoose = require("mongoose");

const deliverySlotSchema = mongoose.Schema({
  slot: {
    type: String,
    required: true,
  },
});

const DeliverySlot = mongoose.model("DeliverySlot", deliverySlotSchema);

module.exports = DeliverySlot;
