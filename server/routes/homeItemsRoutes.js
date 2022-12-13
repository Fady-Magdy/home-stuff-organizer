const express = require("express");
const router = express.Router();
const {
  searchItem,
  newRoom,
  newContainer,
  newItem,
  editRoom,
  editContainer,
  editItem,
  deleteRoom,
  deleteContainer,
  deleteItem,
} = require("../controllers/homeItemsControllers");

router.post("/api/items/search", searchItem);

router.post("/api/items/new-room", newRoom);
router.post("/api/items/new-container", newContainer);
router.post("/api/items/new-item", newItem);

router.post("/api/items/edit-room", editRoom);
router.post("/api/items/edit-container", editContainer);
router.post("/api/items/edit-item", editItem);

router.delete("/api/items/delete-room", deleteRoom);
router.delete("/api/items/delete-container", deleteContainer);
router.delete("/api/items/delete-item", deleteItem);
module.exports = router;
