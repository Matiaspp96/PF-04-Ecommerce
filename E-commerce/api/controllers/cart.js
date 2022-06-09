const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

//Retorna el carrito de un usuario
router.get("/:idUser/cart", async (req, res) => {
  const { idUser } = req.params;
  try {
    user = await User.findOne({ _id: idUser }).populate("cart._id");
    res.send(user.cart);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_CART");
  }
});

//agregar Item al Carrito
const addItem = async (req, res) => {
  const { idUser, idProduct } = req.params;
  try {
    user = await userModel.updateOne(
      { _id: idUser },
      { $addToSet: { cart: [idProduct] } }
    );
    res.send("El item se agrego correctamente");
  } catch (err) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

//Para vaciar el carrito
const deleteItemsCart = async (req, res) => {
  const { idUser } = req.params;
  try {
    user = await User.updateOne({ _id: idUser }, { $pull: { cart: [] } });
    res.send("El carrito quedo vacio");
  } catch (err) {
    handleHttpError(res, "ERROR_DELETE_ITEMS");
  }
};
module.exports = {
  addItem,
  deleteItemsCart,
};
