const express = require("express");
const router = express.Router();
const {
  addNewUser,
  loginUser,
  getUserData,
} = require("../controllers/userControllers");

router.post("/api/add-new-user", addNewUser);
router.post("/api/login-user", loginUser);
router.post("/api/get-user-data", getUserData);
module.exports = router;
