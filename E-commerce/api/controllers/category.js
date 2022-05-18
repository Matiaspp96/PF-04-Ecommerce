
const { catergoryModel} = require("../models");

const getItems = async (req, res) => {
  try {
    const data = await catergoryModel.findAllData({});
    res.send({ data });
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try{
    const {id} = req.params;
    const data = await catergoryModel.findOneData(id);
    res.send({ data });
  }catch(e){
    handleHttpError(res,"ERROR_GET_ITEM")
  }
};


const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await catergoryModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};


const updateItem = async (req, res) => {
  try {
    const {id, ...body} = matchedData(req);
    const data = await catergoryModel.findOneAndUpdate(
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
    const deleteResponse = await catergoryModel.delete({_id:id});
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