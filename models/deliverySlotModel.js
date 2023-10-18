const mongoose = require("mongoose");

const deliverySlotSchema = mongoose.Schema({
  slots: [
    {
      slot: {
        type: String,
        required: true,
      },
    quantity: {
      type: Number,
      required: true
    }},
  ],
  deliveryDate: {
    type: Date,
    required: true,
  },
});

const DeliverySlot = mongoose.model("DeliverySlot", deliverySlotSchema);

module.exports = DeliverySlot;
