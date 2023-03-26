const express = require("express");
const {
  createCoupen,
  getCoupen,
  deleteCoupen,
  coupenUsed,
} = require("../controller/coupenController");
const router = express.Router();

router.route("/create").post(createCoupen);
router.route("/used").post(coupenUsed);
router.route("/").get(getCoupen);
router.route("/delete").delete(deleteCoupen);

module.exports = router;
