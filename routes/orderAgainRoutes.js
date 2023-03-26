const express = require("express");
const { createorderAgain, updateorderAgain, getorderAgainById, getorderAgains, deleteorderAgain } = require("../controller/orderAgainController");


const router = express.Router();

router.route("/create").post(createorderAgain);
router.route("/update").post(updateorderAgain);
router.route("/byId").get(getorderAgainById);
router.route("/all").get(getorderAgains);
router.route("/delete").delete(deleteorderAgain);

module.exports = router;
