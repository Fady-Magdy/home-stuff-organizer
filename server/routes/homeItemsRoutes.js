const express = require("express");
const router = express.Router();
const {
  addNewItem,
  searchItem,
} = require("../controllers/homeItemsControllers");

router.post("/api/add-new-item", addNewItem);
router.post("/api/search-item", searchItem);
module.exports = router;
