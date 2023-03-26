const asyncHandler = require("express-async-handler");
const Heading = require("../models/headingModel");

const createHeading = asyncHandler(async (req, res) => {
  const { name, headingname } = req.body;
  const heading = Heading.create({
    name,
    headingname,
  });
  if (heading) {
    res.status(201).json(heading);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const updateHeading = asyncHandler(async (req, res) => {
  const { id, name, headingname } = req.body;
  const heading = await Heading.findById(id);
  if (heading) {
    heading.name = name;
    heading.headingname = headingname;
    const updatedHeading = await heading.save();

    res.json(updatedHeading);
  } else {
    res.status(404);
    throw new Error("Heading not found");
  }
});
const getHeadings = asyncHandler(async (req, res) => {
  const heading = await Heading.find({});
  res.json(heading);
});
const getHeadingById = asyncHandler(async (req, res) => {
  const heading = await Heading.findById(req.query.id);
  res.json(heading);
});
const deleteHeading = asyncHandler(async (req, res) => {
  await Heading.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

module.exports = {
  updateHeading,
  createHeading,
  getHeadings,
  getHeadingById,
  deleteHeading,
};
