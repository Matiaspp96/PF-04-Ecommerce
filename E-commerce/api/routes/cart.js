const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
const {
  validateId,
  validateObjectDataCreate,
  validateObjectDataUpdate,
} = require("../validators/category");
const {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItemsCart,
} = require("../controllers/category");

router.post("/:idUser/cart/:idProduct", addItem);
router.delete("/:idUser/cart", deleteItemsCart);
router.get("/:idUser/cart", getCartTheUser);
