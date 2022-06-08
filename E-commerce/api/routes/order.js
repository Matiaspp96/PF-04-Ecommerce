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
<<<<<<< HEAD
  purchaseEmail,
} = require("../controllers/order");

router.get("/:id", getItem);
router.get("/", getItems); /* authMiddleware */
router.post("/", authMiddleware, createItem);
router.put("/:id", authRolMiddleware("admin"), authMiddleware, updateItem);
router.delete("/:id", authRolMiddleware("admin"), authMiddleware, deleteItem);
//relacionados a envío de ordenenes
router.post("/:idUser/purchasemail", purchaseEmail);
=======
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
>>>>>>> d5bf59171301ee5450b6b2624a44b25d8f693cfd

module.exports = router;
