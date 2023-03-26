const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Size = require("../models/sizeModel");
const Color = require("../models/colorModel");
const Flavour = require("../models/flavourModel");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const SpecialCategory = require("../models/specialCategoryModel");
const Supplier = require("../models/supplierModel");
const aws = require("aws-sdk");
const ImageBanner = require("../models/ImageBanner");
const TextBanner = require("../models/textBanner");
const DeliveryCharge = require("../models/deliveryChargeModel");
const DeliverySlot = require("../models/deliverySlotModel");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const createSize = asyncHandler(async (req, res) => {
  const { id, name } = req.body;
  const s = Size.create({
    _id: id,
    name: name,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const createDeliveryCharge = asyncHandler(async (req, res) => {
  const { charge, limit } = req.body;
  const s = DeliveryCharge.create({
    charge,
    limit,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getDeliveryCharge = asyncHandler(async (req, res) => {
  const dc = await DeliveryCharge.find({});
  res.json(dc);
});

const updateDeliveryCharge = asyncHandler(async (req, res) => {
  const { charge, limit, id } = req.body;

  const dc = await DeliveryCharge.findById(id);
  if (dc) {
    dc.charge = charge;
    dc.limit = limit;
    const updatedDC = await dc.save();
    res.json(updatedDC);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const createBrand = asyncHandler(async (req, res) => {
  const { id, name, photoLink } = req.body;

  const s = Brand.create({
    _id: id,
    name: name,
    photo: photoLink,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const createColor = asyncHandler(async (req, res) => {
  const { id, name } = req.body;
  const s = Color.create({
    _id: id,
    name: name,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const createFlavour = asyncHandler(async (req, res) => {
  const { id, name } = req.body;
  const s = Flavour.create({
    _id: id,
    name: name,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const createCategory = asyncHandler(async (req, res) => {
  const { id, name, description, photoLink, bannerLink } = req.body;

  const s = Category.create({
    _id: id,
    name: name,
    description: description,
    photo: photoLink,
    banner: bannerLink,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id, name, description, photoLink, bannerLink } = req.body;

  const category = await Category.findById(id);

  if (category) {
    category.name = name;
    category.description = description;
    category.photo = photoLink ? photoLink : category.photo;
    category.banner = bannerLink ? bannerLink : category.banner;

    const updatedCategory = await category.save();

    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});
const getActiveCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({ active: true });
  res.json(categories);
});
const getSubCategory = asyncHandler(async (req, res) => {
  const categories = await SubCategory.find({});
  res.json(categories);
});
const getActiveSubCategory = asyncHandler(async (req, res) => {
  const categories = await SubCategory.find({ active: true });
  res.json(categories);
});
const getSpecialCategory = asyncHandler(async (req, res) => {
  const categories = await SpecialCategory.find({});
  res.json(categories);
});
const getActiveSpecialCategory = asyncHandler(async (req, res) => {
  const categories = await SpecialCategory.find({ active: true });
  res.json(categories);
});
const createSubCategory = asyncHandler(async (req, res) => {
  const { id, name, description, catId, photoLink } = req.body;
  const s = SubCategory.create({
    _id: id,
    name: name,
    category: catId,
    description: description,
    photo: photoLink,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const { id, name, description, photoLink, catId } = req.body;

  const subcategory = await SubCategory.findById(id);

  if (subcategory) {
    subcategory.name = name;
    subcategory.description = description;
    subcategory.photo = photoLink ? photoLink : subcategory.photo;
    subcategory.category = catId;

    const updatedCategory = await subcategory.save();

    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const createSpecialCategory = asyncHandler(async (req, res) => {
  const { id, name, description, catId, subcatId, photoLink } = req.body;
  const s = SpecialCategory.create({
    _id: id,
    name: name,
    category: catId,
    subcategory: subcatId,
    description: description,
    photo: photoLink,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const updateSpecialCategory = asyncHandler(async (req, res) => {
  const { id, name, description, photoLink, catId, subcatId } = req.body;

  const specialcategory = await SpecialCategory.findById(id);

  if (specialcategory) {
    specialcategory.name = name;
    specialcategory.description = description;
    specialcategory.photo = photoLink ? photoLink : specialcategory.photo;
    specialcategory.category = catId;
    specialcategory.subcategory = subcatId;

    const updatedCategory = await specialcategory.save();

    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
const activateDeactivateCat = asyncHandler(async (req, res) => {
  const { catId, active } = req.body;

  const category = await Category.findById(catId);
  if (category) {
    category.active = active;
    const updatedCategory = await category.save();
    res.status(201).json(updatedCategory);
  }
});
const activateDeactivateSubCat = asyncHandler(async (req, res) => {
  const { catId, active } = req.body;
  const category = await SubCategory.findById(catId);
  if (category) {
    category.active = active;
    const updatedCategory = await category.save();
    res.status(201).json(updatedCategory);
  }
});
const activateDeactivateSpecialCat = asyncHandler(async (req, res) => {
  const { catId, active } = req.body;
  const category = await SpecialCategory.findById(catId);
  if (category) {
    category.active = active;
    const updatedCategory = await category.save();
    res.status(201).json(updatedCategory);
  }
});

const createSupplier = asyncHandler(async (req, res) => {
  const { id, name } = req.body;
  const s = Supplier.create({
    _id: id,
    name: name,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getSubCategoryByCategory = asyncHandler(async (req, res) => {
  const catId = req.query.catId;

  const subcategory = await SubCategory.find({ category: catId });
  // const subcategory = await SubCategory.find({
  //   $and: [{ category: catId }, { active: true }],
  // });

  res.json(subcategory);
});

const getSpecialCategoryByCategory = asyncHandler(async (req, res) => {
  const catId = req.query.catId;
  const specialcategory = await SpecialCategory.find({
    category: catId,
  });
  // const specialcategory = await SpecialCategory.find({
  //   $and: [{ category: catId }, { active: true }],
  // });
  res.json(specialcategory);
});

const getSpecialCategoryBySubCategory = asyncHandler(async (req, res) => {
  const SubCatId = req.query.catId;
  const specialcategory = await SpecialCategory.find({
    subcategory: SubCatId,
  });
  // const specialcategory = await SpecialCategory.find({
  //   $and: [{ subcategory: SubCatId }, { active: true }],
  // });
  res.json(specialcategory);
});

const getSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.find({});
  res.json(supplier);
});
const deleteSupplier = asyncHandler(async (req, res) => {
  await Supplier.deleteOne({ _id: req.query.id });
  res.json("deleted");
});
const getSize = asyncHandler(async (req, res) => {
  const size = await Size.find({});
  res.json(size);
});
const deleteSize = asyncHandler(async (req, res) => {
  await Size.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

const getBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.find({});
  res.json(brand);
});
const deleteBrand = asyncHandler(async (req, res) => {
  await Brand.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

const getColor = asyncHandler(async (req, res) => {
  const color = await Color.find({});
  res.json(color);
});
const deleteColor = asyncHandler(async (req, res) => {
  await Color.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

const getFlavour = asyncHandler(async (req, res) => {
  const flavour = await Flavour.find({});
  res.json(flavour);
});
const deleteFlavour = asyncHandler(async (req, res) => {
  await Flavour.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

const deleteCategory = asyncHandler(async (req, res) => {
  const subid = req.query.id;
  const sub = await Category.findById(subid);

  const f1 = sub.photo;
  const fileName = f1.split("//")[1].split("/")[1];

  var params = { Bucket: process.env.AWS_BUCKET, Key: fileName };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log("Image deleted successfully");
  });
  const f2 = sub.banner;
  const fileName2 = f1.split("//")[1].split("/")[1];

  var params = { Bucket: process.env.AWS_BUCKET, Key: fileName2 };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log("Image deleted successfully");
  });

  await Category.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

const deleteSubCategory = asyncHandler(async (req, res) => {
  const subid = req.query.id;
  const sub = await SubCategory.findById(subid);

  const f1 = sub.photo;
  const fileName = f1.split("//")[1].split("/")[1];

  var params = { Bucket: process.env.AWS_BUCKET, Key: fileName };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log("Image deleted successfully");
  });

  await SubCategory.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

const deleteSpecialCategory = asyncHandler(async (req, res) => {
  const subid = req.query.id;
  const sub = await SpecialCategory.findById(subid);

  const f1 = sub.photo;
  const fileName = f1.split("//")[1].split("/")[1];

  var params = { Bucket: process.env.AWS_BUCKET, Key: fileName };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log("Image deleted successfully");
  });

  await SpecialCategory.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

const createImageBanner = asyncHandler(async (req, res) => {
  const { img, title, desc, bg, link, productId } = req.body;

  const s = ImageBanner.create({
    img,
    title,
    desc,
    bg,
    link,
    productId
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getImgBanners = asyncHandler(async (req, res) => {
  const videos = await ImageBanner.find({});
  res.json(videos);
});

const deleteImgBanner = asyncHandler(async (req, res) => {
  const imgId = req.query.id;
  const img1 = await ImageBanner.findById(imgId);

  const f1 = img1.img;
  const fileName = f1.split("//")[1].split("/")[1];

  var params = { Bucket: process.env.AWS_BUCKET, Key: fileName };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log("Image deleted successfully");
  });

  await ImageBanner.deleteOne({ _id: req.query.id });
  res.json("deleted");
});
const createTextBanner = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const s = TextBanner.create({
    textDescription: text,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const updateTextBanner = asyncHandler(async (req, res) => {
  const { text, id } = req.body;

  const banner = await TextBanner.findById(id);
  if (banner) {
    banner.textDescription = text;
    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getTextBanners = asyncHandler(async (req, res) => {
  const texts = await TextBanner.find({});
  res.json(texts);
});
const deleteTextBanners = asyncHandler(async (req, res) => {
  await TextBanner.deleteOne({ _id: req.query.id });
  res.json("deleted");
});
// const addfields = asyncHandler(async (req, res) => {
//   console.log("hit")
//   const categories = await SubCategory.updateMany({}, { $set: { "active": true } });
//   console.log(categories);
//   res.json(categories);
// });

const createDeliverySlot = asyncHandler(async (req, res) => {
  const { slot } = req.body;
  const s = DeliverySlot.create({
    slot,
  });
  if (s) {
    res.status(201).json(s);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getDeliverySlot = asyncHandler(async (req, res) => {
  const dc = await DeliverySlot.find({});
  res.json(dc);
});

const deleteDeliverySlot = asyncHandler(async (req, res) => {
  await DeliverySlot.deleteOne({ _id: req.query.id });
  res.json("deleted");
});

const updateDeliverySlot = asyncHandler(async (req, res) => {
  const { slot, id } = req.body;

  const dc = await DeliverySlot.findById(id);
  if (dc) {
    dc.slot = slot;
    const updatedDC = await dc.save();
    res.json(updatedDC);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

module.exports = {
  createTextBanner,
  updateTextBanner,
  getTextBanners,
  deleteTextBanners,
  updateSpecialCategory,
  updateSubCategory,
  getSubCategoryByCategory,
  getSpecialCategoryByCategory,
  getSpecialCategoryBySubCategory,
  createSize,
  createBrand,
  createCategory,
  createFlavour,
  createSpecialCategory,
  createSubCategory,
  createSupplier,
  createColor,
  getCategory,
  getSubCategory,
  getSpecialCategory,
  getSize,
  getBrand,
  getColor,
  getFlavour,
  getSupplier,
  deleteSupplier,
  deleteBrand,
  deleteCategory,
  deleteColor,
  deleteFlavour,
  deleteSize,
  deleteSpecialCategory,
  deleteSubCategory,
  createImageBanner,
  getImgBanners,
  deleteImgBanner,
  updateCategory,
  activateDeactivateCat,
  activateDeactivateSubCat,
  activateDeactivateSpecialCat,
  getActiveCategory,
  getActiveSpecialCategory,
  getActiveSubCategory,
  getDeliveryCharge,
  createDeliveryCharge,
  updateDeliveryCharge,
  createDeliverySlot,
  getDeliverySlot,
  deleteDeliverySlot,
  updateDeliverySlot,
};
