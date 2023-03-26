const asyncHandler = require("express-async-handler");
const Pincode = require("../models/pincodeModel.js");

const createPincode = asyncHandler(async (req, res) => {
  const { name, area } = req.body;

  const pincode = await Pincode.create({ name, area });
  res.json(pincode);
});

const getPincode = asyncHandler(async (req, res) => {
  const pincode = await Pincode.find({});

  res.json(pincode);
});
const deletePincode = asyncHandler(async (req, res) => {
  const pincode = await Pincode.findById(req.query.pincodeId);

  if (pincode) {
    await pincode.remove();
    res.json({ message: "pincode removed" });
  } else {
    res.status(404);
    throw new Error("pincode not found");
  }
});

module.exports = {
  createPincode,
  getPincode,
  deletePincode,
};
