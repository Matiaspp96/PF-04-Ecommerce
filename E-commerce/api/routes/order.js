const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
const { protectRoute, isAdmin } = require("../middleware/newAuth");
//const authRolMiddleware = require("../middleware/rol");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getUserOrders,
} = require("../controllers/order");

router.get("/:id/orderlist", getUserOrders);

router.get("/:id", getItem);
router.get("/", getItems);
router.post("/", authMiddleware, createItem);
router.put("/:id", isAdmin, authMiddleware, updateItem);
router.delete("/:id", isAdmin, authMiddleware, deleteItem);

module.exports = router;
