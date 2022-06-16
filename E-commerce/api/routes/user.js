const { Router } = require("express");
const router = Router();
const { protectRoute, isAdmin } = require("../middleware/newAuth");
const authMiddleware = require("../middleware/auth");
//const authRolMiddleware = require("../middleware/rol");
const { validateId, validateUserRoleUpdate } = require("../validators/user");
const {
  getItems,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/user");

router.get("/:id", authMiddleware, isAdmin, validateId, getItem);
router.get("/", authMiddleware, isAdmin, getItems);
router.put("/:id", authMiddleware, isAdmin, validateUserRoleUpdate, updateItem);
router.delete("/:id", authMiddleware, isAdmin, validateId, deleteItem);

module.exports = router;
