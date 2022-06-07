const { Router } = require("express");
const router = Router();
//midleware para validad auth de google
const { isAuthenticated } = require("../validators/auth");
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
  // authMiddleware,
  // authRolMiddleware("admin"),
  // validateId,
  isAuthenticated,
  getItem
);
router.get("/", authMiddleware, authRolMiddleware("admin"), getItems);
router.put(
  "/:id",
  // authMiddleware,
  // authRolMiddleware("admin"),
  // validateObjectDataUpdate,
  isAuthenticated,
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
