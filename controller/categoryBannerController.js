const asyncHandler = require("express-async-handler");
const CategoryBanner = require("../models/categoryBannerModel");

const createcategorybanner = asyncHandler(async (req, res) => {
  const { title, desc, img, specialcategory, subcategory, product, category } = req.body;
 
  const categorybanner = CategoryBanner.create({
    title, desc, img, SpecialCategory: specialcategory, subcategory, product, Category: category
  });
  if (categorybanner) {
    res.status(201).json(categorybanner);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getcategorybanners = asyncHandler(async (req, res) => {
  const categorybanner = await CategoryBanner.find({}).populate("SpecialCategory").populate("subcategory").populate("product").populate('Category')
  res.json(categorybanner);
});
const getcategorybannerById = asyncHandler(async (req, res) => {
  const categorybanner = await CategoryBanner.findById(req.query.id);
  res.json(categorybanner);
});
const deletecategorybanner = asyncHandler(async (req, res) => {
    await CategoryBanner.deleteOne({ _id: req.query.id });
    res.json("deleted");
});

module.exports = {  createcategorybanner, getcategorybanners, getcategorybannerById, deletecategorybanner };
