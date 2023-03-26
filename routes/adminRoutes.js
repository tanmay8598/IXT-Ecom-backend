const express = require("express");
// const {
//   getProducts,
//   createProduct,
//   getProductById,
//   deleteProduct,
//   updateProduct,
//   registerAdmin,
//   authAdmin,
// } = require("../controller/productController");
const { registerAdmin, authAdmin } = require("../controller/adminController");

const router = express.Router();

//login register
router.route("/adminregister").post(registerAdmin);
router.route("/adminlogin").post(authAdmin);
// router.post("/adminlogin", authAdmin);

// //products
// router.route("/").get(getProducts).post(createProduct);
// router
//   .route("/:id")
//   .get(getProductById)
//   .delete(deleteProduct)
//   .put(updateProduct);

module.exports = router;
