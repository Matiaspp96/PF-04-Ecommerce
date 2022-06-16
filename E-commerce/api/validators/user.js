const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const validateId = [
  check("id").exists().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
const validateUserRoleUpdate = [
  check("role").exists().notEmpty(),
(req, res, next) => {
  validateResult(req, res, next);
},
];

module.exports = { validateId, validateUserRoleUpdate };