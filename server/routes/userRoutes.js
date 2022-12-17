const router = require("express").Router();
const {
  addNewUser,
  loginUser,
  getUserData,
  checkEmail,
  updateUserImage
} = require("../controllers/userControllers");

router.post("/api/users/new", addNewUser);
router.post("/api/users/login", loginUser);
router.post("/api/users/get-data", getUserData);
router.post("/api/users/check-email", checkEmail);

router.post("/api/users/update-image", updateUserImage)
module.exports = router;
