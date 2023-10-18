const express = require("express");
const { updateRadiusLocation, checkDelivery, checkRadius } = require("../controller/deliverRadiusController");

const router = express.Router();


router.route("/update").post(updateRadiusLocation);
router.route("/check").get(checkDelivery);
router.route("/checkRadius").get(checkRadius);
module.exports = router;