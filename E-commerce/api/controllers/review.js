const { reviewModel } = require("../models/index");
const { handleHttpError } = require("../utils/handleError");
const { updascore} = require("../utils/handlescore");

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
    const {body} = req.body    
    const data = await reviewModel.create(body);
    await updascore(body.productid);    
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_REVIEW");
    console.log(e);
  }
};
module.exports = { getReview, getReviews, newReview };
