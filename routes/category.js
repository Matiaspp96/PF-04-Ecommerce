const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
const authRolMiddleware = require("../middleware/rol");
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
router.post(
  "/",
  authMiddleware,
  authRolMiddleware("admin"),
  validateObjectDataCreate,
  createItem
);
router.put(
  "/:id",
  authMiddleware,
  authRolMiddleware("admin"),
  validateObjectDataUpdate,
  updateItem
);
router.delete(
  "/:id",
  authMiddleware,
  authRolMiddleware("admin"),
  validateId,
  deleteItem
);

module.exports = router;
