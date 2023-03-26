const express = require("express");
const { createHeading, getHeadingById, getHeadings, deleteHeading, updateHeading } = require("../controller/headingController");


const router = express.Router();

router.route("/create").post(createHeading);
router.route("/update").post(updateHeading);
router.route("/byId").get(getHeadingById);
router.route("/all").get(getHeadings);
router.route("/delete").delete(deleteHeading);

module.exports = router;
