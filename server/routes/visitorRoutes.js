const express = require("express");
const router = express.Router();
const { addVisitorData, addIp } = require("../controllers/visitorsControllers");

router.post("/api/add-ip", addIp);
router.get("/api/add-visitor-data", addVisitorData);

module.exports = router;
