const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

//Retorna el carrito de un usuario
const getCartTheUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    user = await userModel.findOne({ _id: idUser }).populate("cart._id");
    res.send(user.cart);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_GET_CART");
  }
};

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
    console.log(err);
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

//Para vaciar el carrito
const deleteItemsCart = async (req, res) => {
  const { idUser } = req.params;
  try {
    user = await userModel.updateOne({ _id: idUser }, { $pull: { cart: [] } });
    res.send("El carrito quedo vacio");
  } catch (err) {
    handleHttpError(res, "ERROR_DELETE_ITEMS");
  }
};

//controlador experimental
const cartLocalstorage = async (req, res) => {
  let { cart, users } = req.body;
  try {
    let foundUser = await User.findOne({ email: users.email });
    if (!foundUser) {
      const newUser = new userModel({
        name: users.name,
        picture: users.picture,
        email: users.email,
      });
      newUser.cart = cart;
      const savedUser = await newUser.save();
    } else {
      userCart = await userModel.updateOne(
        { _id: foundUser._id },
        { $set: { cart: cart } }
      );
    }

    res.send("Se modifico el carrito");
  } catch (err) {}
};

module.exports = {
  addItem,
  deleteItemsCart,
  getCartTheUser,
  cartLocalstorage,
};
