const mongoose = require("mongoose");

const dealerPriceSchema = mongoose.Schema({
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  margin: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: "Product",
  },
});

const DealerPrice = mongoose.model("DealerPrice", dealerPriceSchema);

module.exports = DealerPrice;
