const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
<<<<<<< HEAD
const authRolMiddleware = require("../middleware/rol");
const { isAuthenticated } = require("../validators/auth");
=======
const {protectRoute, isAdmin} = require('../middleware/newAuth');
//const authRolMiddleware = require("../middleware/rol");

>>>>>>> d5bf59171301ee5450b6b2624a44b25d8f693cfd
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
<<<<<<< HEAD
  //authMiddleware,
  //restablecer middles
  /* isAuthenticated,
  authRolMiddleware("admin"),
  validateObjectDataCreate, */
=======
  authMiddleware,
  isAdmin,
  validateObjectDataCreate,
>>>>>>> d5bf59171301ee5450b6b2624a44b25d8f693cfd
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
