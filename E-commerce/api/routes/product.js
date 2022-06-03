const { Router } = require("express");
//midleware para validad auth de google
const { isAuthenticated } = require("../validators/auth");
const router = Router();
const authMiddleware = require("../middleware/auth");
const authRolMiddleware = require("../middleware/rol");
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
} = require("../controllers/product");

router.get("/", getItembyName);
router.get("/:id", validateId, getItem);
router.get("/",getItems);
router.post(
  "/",
  //authMiddleware,
  isAuthenticated,
  authRolMiddleware(["admin"]),
  validateObjectDataCreate,
  createItem
);
router.put(
  "/:id",
  //authMiddleware,
  isAuthenticated,
  authRolMiddleware(["admin"]),
  validateObjectDataUpdate,
  updateItem
);
router.delete(
  "/:id",
  //authMiddleware,
  isAuthenticated,
  authRolMiddleware(["admin"]),
  validateId,
  deleteItem
);

module.exports = router;
