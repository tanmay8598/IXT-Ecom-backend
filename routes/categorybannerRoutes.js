const express = require("express");
const { createcategorybanner, getcategorybannerById, getcategorybanners, deletecategorybanner } = require("../controller/categoryBannerController");

const router = express.Router();

router.route("/create").post(createcategorybanner);
router.route("/byId").get(getcategorybannerById);
router.route("/all").get(getcategorybanners);
router.route("/delete").delete(deletecategorybanner);

module.exports = router;
