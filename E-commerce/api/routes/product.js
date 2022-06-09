const { Router } = require("express");
const {protectRoute, isAdmin} = require('../middleware/newAuth');
const router = Router();
const authMiddleware = require("../middleware/auth");
//const authRolMiddleware = require("../middleware/rol");
const {
  validateId,
  validateObjectDataCreate,
  validateObjectDataUpdate,
} = require("../validators/product");
const {
  getItembyName,
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  addCategoryProduct,
} = require("../controllers/product");
router.get("/",getItems);
router.get("/", getItembyName);
router.get("/:id", validateId, getItem);

router.post(
  "/",
  authMiddleware,
  isAdmin,
  validateObjectDataCreate,
  createItem
);
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  validateObjectDataUpdate,
  updateItem
);
router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  validateId,
  deleteItem
);

module.exports = router;
