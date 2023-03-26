const express = require("express");
const { createTheme, getThemeById, getThemes, deleteTheme, updateTheme } = require("../controller/themeController");


const router = express.Router();

router.route("/create").post(createTheme);
router.route("/update").post(updateTheme);
router.route("/byId").get(getThemeById);
router.route("/all").get(getThemes);
router.route("/delete").delete(deleteTheme);

module.exports = router;
