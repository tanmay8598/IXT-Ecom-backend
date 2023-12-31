const express = require("express");
const {
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  saveShippingAddress,
  assignDealer,
  removeDealer,
  getDealers,
  updateRewardPoints,
  clearVerificationCode,
  updateOTPLogin,
  checkUser,
  downloadCustomers,
  getTopCustomers,
} = require("../controller/userController");
const admin = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(getUsers);

router.post("/saveshippingaddress", saveShippingAddress);
router.post("/assigndealer", assignDealer);
router.post("/removedealer", removeDealer);
router.post("/updateRewardPoints", updateRewardPoints);
router.get("/getdealers", getDealers);
router.get("/checkuser", checkUser);
router.post("/clearVerificationCode", clearVerificationCode);
router.post("/updateOTPLogin", updateOTPLogin);

router.route("/profile").put(updateUserProfile);
router.get("/download", downloadCustomers);
router.get("/top", getTopCustomers,);
router
  .route("/:id")
  .delete(deleteUser)
  .get(admin, getUserById)
  .put(admin, updateUser);



module.exports = router;
