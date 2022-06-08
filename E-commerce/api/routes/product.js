const { Router } = require("express");
<<<<<<< HEAD
//midleware para validad auth de google
const { isAuthenticated } = require("../validators/auth");
=======
const {protectRoute, isAdmin} = require('../middleware/newAuth');
>>>>>>> d5bf59171301ee5450b6b2624a44b25d8f693cfd
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
<<<<<<< HEAD

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
=======
router.get("/",getItems);
router.get("/", getItembyName);
router.get("/:id", validateId, getItem);

router.post(
  "/",
  authMiddleware,
  isAdmin,
>>>>>>> d5bf59171301ee5450b6b2624a44b25d8f693cfd
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
