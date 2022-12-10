const express = require("express");
const router = express.Router();
const {
  addNewItem,
  searchItem,
  getAllItems
} = require("../controllers/homeItemsControllers");

router.post("/api/items/new", addNewItem);
router.post("/api/items/search", searchItem);
router.post("/api/items", getAllItems);

module.exports = router;
