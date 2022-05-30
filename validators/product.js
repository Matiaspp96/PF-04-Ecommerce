const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const validateObjectDataCreate = [
  check("name").exists().notEmpty(),
  check("description").exists().notEmpty(),
  check("price").exists().notEmpty(),
  check("stock").exists().notEmpty(),
  check("image").exists().notEmpty(),
  check("category").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateObjectDataUpdate = [
    check("name").exists().notEmpty(),
    check("description").exists().notEmpty(),
    check("price").exists().notEmpty(),
    check("stock").exists().notEmpty(),
    check("image").exists().notEmpty(),
    check("category").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateId = [
  check("id").exists().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateId, validateObjectDataCreate, validateObjectDataUpdate };