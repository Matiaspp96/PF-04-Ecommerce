const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
const { protectRoute, isAdmin } = require("../middleware/newAuth");
//const authRolMiddleware = require("../middleware/rol");

const {
  validateId,
  validateObjectDataCreate,
  validateObjectDataUpdate,
} = require("../validators/category");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/category");

router.get("/:id", validateId, getItem);
router.get("/", getItems);
router.post("/", authMiddleware, isAdmin, validateObjectDataCreate, createItem);
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  validateObjectDataUpdate,
  updateItem
);
router.delete("/:id", authMiddleware, isAdmin, validateId, deleteItem);

module.exports = router;
