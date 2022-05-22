const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
const authRolMiddleware = require("../middleware/rol");
const {getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/order");

router.get("/:id",authMiddleware, getItem);
router.get("/",authMiddleware, getItems);
router.post("/",authMiddleware, createItem);
router.put("/:id",authRolMiddleware("admin"),authMiddleware, updateItem);
router.delete("/:id",authRolMiddleware("admin"),authMiddleware, deleteItem);

module.exports = router;