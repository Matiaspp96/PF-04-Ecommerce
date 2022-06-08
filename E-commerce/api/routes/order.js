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
router.post("/", createItem);
router.put("/:id", updateItem); /* authRolMiddleware("admin"), authMiddleware, */
router.delete("/:id", deleteItem); /* authRolMiddleware("admin"), authMiddleware, */

//rutas de prueba para orders

module.exports = router;
