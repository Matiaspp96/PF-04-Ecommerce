const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
const authRolMiddleware = require("../middleware/rol");
const {
  validateId,
  validateObjectDataUpdate,
} = require("../validators/category");
const {
  getItems,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/user");

router.get(
  "/:id",
  authMiddleware,
  authRolMiddleware("admin"),
  validateId,
  getItem
);
router.get("/", authMiddleware, authRolMiddleware("admin"), getItems);
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
