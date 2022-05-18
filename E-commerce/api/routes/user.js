const { Router } = require("express");
const router = Router();
//const authMiddleware = require("../middleware/auth");
const { getItems, getItem, updateItem, deleteItem } = require("../controllers/user");
const {
    validateId
  } = require("../validators/user")

router.get("/:id",validateId,  getItem);
router.get("/", getItems);
router.put("/:id",validateId, updateItem);
router.delete("/:id",validateId, deleteItem);


module.exports = router;