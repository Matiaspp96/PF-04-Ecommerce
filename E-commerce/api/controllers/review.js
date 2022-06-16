const { reviewModel, productModel, userModel } = require("../models/index");
const { handleHttpError } = require("../utils/handleError");
const { updascore } = require("../utils/handlescore");

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find()
      .populate("product")
      .populate("users");
    return res.status(200).send({ reviews });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await reviewModel.findById(id).populate("product");
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const newReview = async (req, res) => {
  try {
    const { body } = req;
    const { idProduct } = req.params;
    await updascore(body.productid);
    const data = await reviewModel.create(body);

    const productFound = await productModel.findById(idProduct);
    data.product = productFound;
    const userFound = await userModel.findOne({ email: body.users.email });
    data.user = userFound;

    if (data) {
      const savedReview = await data.save();
      const productReview = await productModel.findByIdAndUpdate(idProduct, {
        $addToSet: { reviews: savedReview },
      });
      return res
        .status(200)
        .send(`"The review has been created successfully" ${productReview}`);
    }
    return res.status(404).send("Error: The review has not been created.");
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_REVIEW");
  }
};
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResponse = await reviewModel.findByIdAndRemove({ _id: id });
    const data = {
      deleted: deleteResponse.matchedCount,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_REVIEW");
  }
};
module.exports = { getReview, getReviews, newReview, deleteReview };
