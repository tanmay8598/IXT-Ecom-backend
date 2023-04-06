const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    shippingAddress: {
      address: { type: String },
      street: { type: String },
      city: { type: String, default: "Lucknow" },
      pincode: { type: String },
      landmark: { type: String },
      area: { type: String },
      mobileNumber: { type: Number },
      email: { type: String },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDealer: {
      type: Boolean,
      required: true,
      default: false,
    },
    pushToken: {
      type: String,
    },
    verificationCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
