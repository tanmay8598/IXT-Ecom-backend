const asyncHandler = require("express-async-handler");
const Theme = require("../models/themeModel");

const createTheme = asyncHandler(async (req, res) => {
  const { firstcolor, secondcolor, thirdcolor, fourthcolor } = req.body;
  const theme = Theme.create({
    firstcolor,
    secondcolor,
    thirdcolor,
    fourthcolor,
  });
  if (theme) {
    res.status(201).json(theme);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const updateTheme = asyncHandler(async (req, res) => {

  const { id, firstcolor, secondcolor, thirdcolor, fourthcolor } = req.body;
  const theme = await Theme.findById(id)

  if (theme) {
    theme.firstcolor = firstcolor
    theme.secondcolor = secondcolor
    theme.thirdcolor = thirdcolor
    theme.fourthcolor = fourthcolor
    const updatedHeading = await theme.save();

    res.json(updatedHeading);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const getThemes = asyncHandler(async (req, res) => {
  const theme = await Theme.find({});
  res.json(theme);
});
const getThemeById = asyncHandler(async (req, res) => {
  const theme = await Theme.findById(req.query.id);
  res.json(theme);
});
const deleteTheme = asyncHandler(async (req, res) => {
    await Theme.deleteOne({ _id: req.query.id });
    res.json("deleted");
});

module.exports = { createTheme, getThemes, getThemeById, deleteTheme, updateTheme };
