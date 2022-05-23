const { reviewModel } = require("../models/index");
const { handleHttpError } = require("../utils/handleError");

const getReviews = async (req, res) => {
  try {
    const data = await reviewModel.find();
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await reviewModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const newReview = async (req, res) => {
  try {
    const data = req.body;
    reviewModel.create(data, (err, docs) => {
      res.send({ data: docs });
    });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_REVIEW");
    console.log(e);
  }
};
module.exports = { getReview, getReviews, newReview };
