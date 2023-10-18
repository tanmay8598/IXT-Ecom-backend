const express = require("express");
const {
  addWishlistItems,
  deleteWishlistItems,
  getWishlist,
} = require("../controller/wishlistController");
const router = express.Router();

router.route("/create").post(addWishlistItems);
router.route("/delete").delete(deleteWishlistItems);
router.route("/getall").get(getWishlist);

module.exports = router;
