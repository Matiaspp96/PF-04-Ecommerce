const { productModel, catergoryModel, userModel } = require("../models");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");

//byname

const getItembyName = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      let products = await productModel.find({
        name: { $regex: name, $options: "i" },
      });
      if (products.length) {
        res.json(products);
      } else {
        res.status(404).send("Product not found");
      }
    } else {
      let products = await productModel
        .find({})
        .populate("categories")
        .populate("reviews");

      if (products.length) {
        res.json(products);
      } else {
        res.status(404).send("Product not found.");
      }
    }
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEM_BY_NAME");
  }
};

const getItems = async (req, res) => {
  try {
    const data = await productModel
      .find()
      .populate("categories")
      .populate("reviews");
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productModel
      .findById(id)
      .populate("categories")
      .populate("reviews");
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const { body } = req;
    const checkIsExist = await productModel.findOne({ name: body.name });
    if (checkIsExist) {
      handleErrorResponse(res, "PRODUCT_EXISTS", 401);
      return;
    }
    const data = await productModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const  body  = req.body;
    const data = await productModel.findByIdAndUpdate(id, body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResponse = await productModel.findByIdAndRemove({ _id: id });
    const data = {
      deleted: deleteResponse.matchedCount,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

//sección de categoría al producto
const addProductCategory = async (req, res) => {
  try {
    const { idProduct, idCategory } = req.body;
    data = await productModel.findOneAndUpdate(
      { _id: idProduct },
      { $push: { category: idCategory } }
    );

    res.send("The category has been successfully added to the product." + data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_ADD_ITEM_CATEGORY");
  }
};

module.exports = {
  getItems,
  getItem,
  getItembyName,
  createItem,
  updateItem,
  deleteItem,
  addProductCategory,
};
