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
      let products = await productModel.find({}).populate("reviews");

      if (products.length) {
        res.json(products);
      } else {
        res.status(404).send("Product not found.");
      }
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const getItems = async (req, res) => {
 
  try {
    const data = await productModel.find();
    res.send({ data,  });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const { body } = req.body;
    const checkIsExist = await catergoryModel.findOne({ name: body.name });
    if (checkIsExist) {
      handleErrorResponse(res, "PRODUCT_EXISTS", 401);
      return;
    }
    const data = await productModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
    console.log(e);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
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
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItems,
  getItem,
  getItembyName,
  createItem,
  updateItem,
  deleteItem,
};
