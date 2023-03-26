const express = require("express");
const {
  createSize,
  createColor,
  createFlavour,
  createBrand,
  createCategory,
  createSubCategory,
  createSpecialCategory,
  createSupplier,
  createWeight,
  getCategory,
  updateCategory,
  getSubCategory,
  getSpecialCategory,
  getSubCategoryByCategory,
  getSpecialCategoryByCategory,
  getSpecialCategoryBySubCategory,
  getWeight,
  getSize,
  getBrand,
  getColor,
  getFlavour,
  deleteWeigth,
  deleteBrand,
  deleteSize,
  deleteColor,
  deleteFlavour,
  deleteCategory,
  deleteSubCategory,
  deleteSpecialCategory,
  getSupplier,
  deleteSupplier,
  getVideos,
  createVideoBanner,
  deleteVideoBanner,
  createImageBanner,
  getImgBanners,
  deleteImgBanner,
  updateSpecialCategory,
  updateSubCategory,
  activateDeactivateCat,
  activateDeactivateSubCat,
  activateDeactivateSpecialCat,
  addfields,
  getActiveCategory,
  getActiveSubCategory,
  getActiveSpecialCategory,
  createTextBanner,
  updateTextBanner,
  getTextBanners,
  deleteTextBanners,
  getDeliveryCharge,
  createDeliveryCharge,
  updateDeliveryCharge,
  createDeliverySlot,
  getDeliverySlot,
  updateDeliverySlot,
  deleteDeliverySlot,
} = require("../controller/variationController");
const router = express.Router();

router.route("/deliveryslot").post(createDeliverySlot);
router.route("/get-deliveryslot").get(getDeliverySlot);
router.route("/update-deliveryslot").post(updateDeliverySlot);
router.route("/delete-deliveryslot").delete(deleteDeliverySlot);

router.route("/size").post(createSize);
router.route("/deliverycharge").post(createDeliveryCharge);
router.route("/get-deliverycharge").get(getDeliveryCharge);
router.route("/update-deliverycharge").post(updateDeliveryCharge);
router.route("/color").post(createColor);
router.route("/flavour").post(createFlavour);
router.route("/brand").post(createBrand);
router.route("/category").post(createCategory);
router.route("/updatecategory").post(updateCategory);
router.route("/updatesubcategory").post(updateSubCategory);
router.route("/updatespecialcategory").post(updateSpecialCategory);
router.route("/get-categories").get(getCategory);
router.route("/get-active-categories").get(getActiveCategory);
router.route("/get-sub-categories").get(getSubCategory);
router.route("/get-active-sub-categories").get(getActiveSubCategory);
router.route("/get-special-categories").get(getSpecialCategory);
router.route("/get-active-special-categories").get(getActiveSpecialCategory);
router.route("/subcategory").post(createSubCategory);
router.route("/specialcategory").post(createSpecialCategory);
router.route("/supplier").post(createSupplier);
router.route("/activatecat").post(activateDeactivateCat);
router.route("/activatesubcat").post(activateDeactivateSubCat);
router.route("/activatespecialcat").post(activateDeactivateSpecialCat);

//banners

router.route("/create-img-banner").post(createImageBanner);

//get
router.route("/get-sub-bycat").get(getSubCategoryByCategory);
router.route("/imgs-banner").get(getImgBanners);
router.route("/get-special-bycat").get(getSpecialCategoryByCategory);
router.route("/get-special-bysub").get(getSpecialCategoryBySubCategory);

//more get
router.route("/getsize").get(getSize);
router.route("/getbrand").get(getBrand);
router.route("/getcolor").get(getColor);
router.route("/getflavour").get(getFlavour);
router.route("/getsupplier").get(getSupplier);

router.route("/deletesupplier").delete(deleteSupplier);
router.route("/deletebrand").delete(deleteBrand);

router.route("/deletesize").delete(deleteSize);
router.route("/deletecolor").delete(deleteColor);
router.route("/deleteflavour").delete(deleteFlavour);
router.route("/deletecategory").delete(deleteCategory);
router.route("/deletesubcategory").delete(deleteSubCategory);
router.route("/deletespecialcategory").delete(deleteSpecialCategory);

router.route("/deleteimgbanner").delete(deleteImgBanner);

router.route("/textbanner").post(createTextBanner);
router.route("/update-textbanner").post(updateTextBanner);
router.route("/gettextbanners").get(getTextBanners);
router.route("/deletetextbanner").delete(deleteTextBanners);

module.exports = router;
