const { Router } = require("express");
const router = Router();
<<<<<<< HEAD
//midleware para validad auth de google
const { isAuthenticated } = require("../validators/auth");
=======
const {protectRoute, isAdmin} = require('../middleware/newAuth')
>>>>>>> d5bf59171301ee5450b6b2624a44b25d8f693cfd
const authMiddleware = require("../middleware/auth");
//const authRolMiddleware = require("../middleware/rol");
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
  isAdmin,
  validateId,
  getItem
);
router.get("/", 
authMiddleware, 
isAdmin, 
getItems);
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
