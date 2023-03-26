const mongoose = require("mongoose");

const headingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  headingname: {
    type: String,
    required: true,
  }
});

const Heading = mongoose.model("Heading", headingSchema);

module.exports = Heading;
