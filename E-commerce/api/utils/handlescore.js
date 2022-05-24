const { reviewModel } = require("../models/index");
const { productModel } = require("../models/index");


const updascore = async (id) => {
  try {
    const reviews = await reviewModel.find({_id: id });
    let sum = reviews.reduce((previous, current) => current.punctuation += previous);
    let avg = sum / values.length;
    await productModel.findByIdAndUpdate(
      id, {score:avg}
    );
  } catch (e) {
    return null;
  }
};

const decodeSign = (token) => {
  return jwt.decode(token, null);
};

module.exports = { updascore };