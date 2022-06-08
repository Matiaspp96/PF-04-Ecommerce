const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
const authRolMiddleware = require("../middleware/rol");
const { isAuthenticated } = require("../validators/auth");
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
  //authMiddleware,
  //restablecer middles
  /* isAuthenticated,
  authRolMiddleware("admin"),
  validateObjectDataCreate, */
  createItem
);
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  validateObjectDataUpdate,
  updateItem
);
router.delete("/:id", authMiddleware, isAdmin, validateId, deleteItem);

module.exports = router;
