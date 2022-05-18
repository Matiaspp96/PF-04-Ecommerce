const { Router } = require("express");
const router = Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/product");

router.get("/:id", getItem);
router.get("/", getItems);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;