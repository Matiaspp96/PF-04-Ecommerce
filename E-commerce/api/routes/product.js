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
  addCategoryProduct,
} = require("../controllers/product");

router.get("/name/", getItembyName);
//para catergorías
router.post("/addcategory", addCategoryProduct);
router.get("/:id", validateId, getItem);
router.get("/", getItems);
router.post(
  "/",
  authMiddleware,
  isAuthenticated,
  authRolMiddleware(["admin"]),
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
router.delete("/:id", authMiddleware, isAdmin, validateId, deleteItem);

module.exports = router;
