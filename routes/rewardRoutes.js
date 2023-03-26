const express = require("express");
const {
  addRewardPoints,
  getRewardPoints,
  updateRewardPoints,
  removeRewardPoints,
} = require("../controller/userRewardController");

const router = express.Router();

router.route("/getrewardpoints").get(getRewardPoints);
router.route("/removerewardpoints").get(removeRewardPoints);

module.exports = router;
