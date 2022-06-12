const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth");
/* const {
  validateId,
  validateObjectDataCreate,
  validateObjectDataUpdate,
} = require("../validators/category"); */
const {
  /* getItems, */
  /*  getItem, */
  addItem,
  /* updateItem, */
  getCartTheUser,
  deleteItemsCart,
  cartLocalstorage,
} = require("../controllers/cart");

router.post("/addItem/:idUser", addItem);
/* router.post("/:idUser/cart/:idProduct", addItem); */
/* router.post("/addcart", addItem); */
/* router.delete("/:idUser/cart", deleteItemsCart); */
router.delete("/deleteCart", deleteItemsCart);
router.get("/:idUser/itemsInCart", getCartTheUser);

//ruta experimental
router.post("/cartStorage", cartLocalstorage);

module.exports = router;
