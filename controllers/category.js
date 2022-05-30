
const { catergoryModel} = require("../models");
const { handleHttpError,
  handleErrorResponse } = require("../utils/handleError");

const getItems = async (req, res) => {
  try {
    const data = await catergoryModel.find();
    res.send({ data });
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try{
    const {id} = req.params;
    const data = await catergoryModel.findById(id);
    res.send({ data });
  }catch(e){
    handleHttpError(res,"ERROR_GET_ITEM")
  }
};


const createItem = async (req, res) => {
  try {
    const body = req.body
    const checkIsExist = await catergoryModel.findOne({ name: body.name });
    if (checkIsExist) {
      handleErrorResponse(res, "CATEGORY_EXISTS", 401);
      return;
    }
    const data = await catergoryModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};


const updateItem = async (req, res) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const data = await catergoryModel.findByIdAndUpdate(
      id, body
    );
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};


const deleteItem = async (req, res) => {
  try{
    const {id} = req.params;
    const deleteResponse = await catergoryModel.findByIdAndRemove({_id:id});
    const data = {
      deleted: deleteResponse.matchedCount
    }
    
    res.send({data});
  }catch(e){
    console.log(e)
    handleHttpError(res,"ERROR_DELETE_ITEM")
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };