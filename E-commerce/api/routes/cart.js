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
    createItem,
    updateItem,
    deleteItem,
  } = require("../controllers/category");