const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validatorReview = [
  check("punctuation").exists().notEmpty().isInt({ min: 1, max: 5 }),
  check("opinion").exists().notEmpty(),
  check("date").exists().notEmpty(),
  check("modified").exists().notEmpty(),

  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

module.exports = validatorReview;
