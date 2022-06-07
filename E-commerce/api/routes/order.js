const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
const authRolMiddleware = require("../middleware/rol");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/order");

router.get("/:id", getItem);
router.get("/", getItems); /* authMiddleware */
router.post("/", authMiddleware, createItem);
router.put("/:id", authRolMiddleware("admin"), authMiddleware, updateItem);
router.delete("/:id", authRolMiddleware("admin"), authMiddleware, deleteItem);

//rutas de prueba para orders

module.exports = router;
