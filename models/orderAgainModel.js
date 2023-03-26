const mongoose = require("mongoose");

const orderAgainSchema = mongoose.Schema({
 
    product: {
        type: mongoose.Schema.Types.String,
        ref: "Product",
      }
  
});

const OrderAgain = mongoose.model("OrderAgain", orderAgainSchema);

module.exports = OrderAgain;
