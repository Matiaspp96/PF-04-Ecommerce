const { Router } = require("express");
const { protectRoute, isAdmin } = require("../middleware/newAuth");
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
  addProductCategory,
} = require("../controllers/product");
router.get("/", getItems);
router.get("/name", getItembyName);
router.get("/:id", validateId, getItem);
//para catergorías
router.post("/addcategory", addProductCategory);

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
