const express = require("express");
const {
  getProducts,
  getProductsByCategory,
  createProduct,
  getProductById,
  getProductByGroupId,
  getProductsBySubCategory,
  updateProduct,
  deleteProduct,
  createSaleByCategory,
  createSaleBySubCategory,
  createSaleBySpecialCategory,
  createSaleByProduct,
  searchProducts,
  getProductsBySpecialCategory,
  createProductReview,
  getBestSellingProducts,
  getSaleProducts,
  getRecentReviews,
  deleteReviews,
  outOfStockProduct,
  createDealerPrice,
  updateDealerPrice,
  deleteDealerPrice,
  getDealerPricesByProductId,
  downloadProducts,
  getTotalProducts,
} = require("../controller/productController");
const router = express.Router();

router.route("/").get(getProducts);
router.route("/count").get(getTotalProducts);
router.route("/outofstockproducts").get(outOfStockProduct);
router.route("/getdealerpricebyproductid").get(getDealerPricesByProductId);
router.route("/createdealerprice").post(createDealerPrice);
router.route("/deletedealerprice").delete(deleteDealerPrice);
router.route("/getproductbyid").get(getProductById);
router.route("/getrecentreviews").get(getRecentReviews);
router.route("/deletereview").post(deleteReviews);
router.route("/bestproducts").get(getBestSellingProducts);
router.route("/sale-products").get(getSaleProducts);
router.route("/search").get(searchProducts);
router.route("/create").post(createProduct);
router.route("/update").post(updateProduct);
router.route("/salebycategory").post(createSaleByCategory);
router.route("/salebysubcategory").post(createSaleBySubCategory);
router.route("/salebyspecialcategory").post(createSaleBySpecialCategory);
router.route("/salebyproduct").post(createSaleByProduct);
router.route("/delete").delete(deleteProduct);
router.route("/getProductsByCategory").get(getProductsByCategory);
router.route("/get-productby-groupid").get(getProductByGroupId);
router.route("/get-productby-sub-category").get(getProductsBySubCategory);
router.route("/create-review").post(createProductReview);
router
  .route("/get-productby-special-category")
  .get(getProductsBySpecialCategory);
router.route("/download").get(downloadProducts);

module.exports = router;
