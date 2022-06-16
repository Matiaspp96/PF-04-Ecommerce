const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
/* const {
  validateId,
  validateObjectDataCreate,
  validateObjectDataUpdate,
} = require("../validators/category"); */
const {
  addItem,
  getCartTheUser,
  deleteItemsCart,
  cartLocalstorage,
} = require("../controllers/cart");

router.post("/addItem/:idUser", addItem);
router.delete("/deleteCart", deleteItemsCart);
router.get("/:idUser/itemsInCart", getCartTheUser);

//ruta experimental
router.post("/cartStorage", cartLocalstorage);

module.exports = router;
