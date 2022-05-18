
const { productModel} = require("../models");

const getItems = async (req, res) => {
  try {
    const data = await productModel.findAllData({});
    res.send({ data });
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try{
    const {id} = req.params;
    const data = await productModel.findOneData(id);
    res.send({ data });
  }catch(e){
    handleHttpError(res,"ERROR_GET_ITEM")
  }
};


const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await productModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};


const updateItem = async (req, res) => {
  try {
    const {id, ...body} = matchedData(req);
    const data = await productModel.findOneAndUpdate(
      id, body
    );
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};


const deleteItem = async (req, res) => {
  try{
    req = matchedData(req);
    const {id} = req.params;
    const deleteResponse = await productModel.delete({_id:id});
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