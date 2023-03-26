const express = require("express");
const {
  createPincode,
  deletePincode,
  getPincode,
} = require("../controller/pincodeController");
const router = express.Router();

router.route("/create").post(createPincode);
router.route("/delete").delete(deletePincode);
router.route("/").get(getPincode);

module.exports = router;
