const express = require("express");
const router = express.Router();
const { addNewUser } = require("../controllers/userControllers");

router.post("/api/add-new-user", addNewUser);

module.exports = router;
