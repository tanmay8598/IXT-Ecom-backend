const asyncHandler = require("express-async-handler");
const Coupen = require("../models/coupenModel.js");

const createCoupen = asyncHandler(async (req, res) => {
  const { name, discount, limit } = req.body;

  const coupen = await Coupen.create({ name, discount, limit });

  res.json(coupen);
});

const getCoupenById = asyncHandler(async (req, res) => {
  const coupen = await Coupen.findById(req.query.coupenId);

  res.json(coupen);
});
const getCoupen = asyncHandler(async (req, res) => {
  const coupens = await Coupen.find({});

  res.json(coupens);
});
const deleteCoupen = asyncHandler(async (req, res) => {
  const coupen = await Coupen.findById(req.query.coupenId);

  if (coupen) {
    await coupen.remove();
    res.json({ message: "coupen removed" });
  } else {
    res.status(404);
    throw new Error("coupen not found");
  }
});
const coupenUsed = asyncHandler(async (req, res) => {
  const { coupenId, userId } = req.body;

  const coupen = await Coupen.findById(coupenId);
  let arr = [];
  if (coupen) {
    arr = coupen.usedBy;
    arr.push(userId);
    coupen.usedBy = arr;
    coupen.count = coupen.count + 1;
    const updatedCoupen = await coupen.save();
    res.json(updatedCoupen);
  } else {
    res.status(404);
    throw new Error("coupen not found");
  }
});

module.exports = {
  createCoupen,
  getCoupenById,
  getCoupen,
  deleteCoupen,
  coupenUsed,
};
