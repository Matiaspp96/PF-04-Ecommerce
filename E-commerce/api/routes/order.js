const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
<<<<<<< HEAD
const authRolMiddleware = require("../middleware/rol");
=======
const {protectRoute, isAdmin} = require('../middleware/newAuth');
//const authRolMiddleware = require("../middleware/rol");
>>>>>>> d5bf59171301ee5450b6b2624a44b25d8f693cfd
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/order");

router.get("/:id", authMiddleware, getItem);
router.get("/", authMiddleware, getItems);
router.post("/", authMiddleware, createItem);
router.put("/:id", 
isAdmin, 
authMiddleware, updateItem);
router.delete("/:id", 
isAdmin,
authMiddleware, deleteItem);

module.exports = router;
