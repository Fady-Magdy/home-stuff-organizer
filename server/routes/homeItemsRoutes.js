const express = require("express");
const router = express.Router();
const {
  searchItem,
  addRoom,
  addContainer,
  addItem,
  deleteRoom,
} = require("../controllers/homeItemsControllers");

router.post("/api/items/search", searchItem);

router.post("/api/items/add-room", addRoom);
router.post("/api/items/add-container", addContainer);
router.post("/api/items/add-item", addItem);

router.delete("/api/items/delete-room", deleteRoom);

module.exports = router;
