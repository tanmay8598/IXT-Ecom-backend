const asyncHandler = require("express-async-handler");
const OrderAgain = require("../models/orderAgainModel");

const createorderAgain = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const orderAgain = OrderAgain.create({
    product: id,
  });
  if (orderAgain) {
    res.status(201).json(orderAgain);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const updateorderAgain = asyncHandler(async (req, res) => {
  const { products } = req.body;
  const orderAgain = OrderAgain.findById(id);
  if (orderAgain) {
    orderAgain.products = products;
    const updatedorderAgain = await orderAgain.save();
    res.json(updatedorderAgain);
  } else {
    res.status(404);
    throw new Error("orderAgain not found");
  }
});

const getorderAgains = asyncHandler(async (req, res) => {
  const orderAgain = await OrderAgain.find({}).populate({
    path: "product",
    populate: [
      {
        path: "category",
      },
      {
        path: "subcategory",
      },
      {
        path: "specialcategory",
      },
      {
        path: "brand",
      },
      {
        path: "color",
      },
      {
        path: "size",
      },
    ],
  });

  res.json(orderAgain);
});

const getorderAgainById = asyncHandler(async (req, res) => {
  const orderAgain = await OrderAgain.findById(req.query.id);
  res.json(orderAgain);
});

const deleteorderAgain = asyncHandler(async (req, res) => {
  await OrderAgain.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

module.exports = {
  updateorderAgain,
  createorderAgain,
  getorderAgains,
  getorderAgainById,
  deleteorderAgain,
};
