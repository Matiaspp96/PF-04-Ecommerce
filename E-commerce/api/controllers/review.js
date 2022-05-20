const { reviewModel } = require("../models/index");
const { productModel } = require("../models");
const { userModel } = require("../models");

const newReview = async (req, res) => {
  const { idProduct } = req.params;
  const { user, punctuation, opinion, date, modified } = req.body;
  if ((punctuation) => 5 || punctuation <= 1)
    try {
      const review = new reviewModel({
        punctuation,
        opinion,
        date,
        modified,
      });

      const productFound = await productModel.findById(idProduct);
      review.product = productFound;
      /*  const userFound = await userModel.findOne({ email });
      review.userModel = userFound; */

      if (review) {
        const savedReview = await review.save();
        const productReview = await productModel.findByIdAndUpdate(idProduct, {
          $addToSet: { reviews: savedReview },
        });
        return res
          .status(200)
          .send("The review has been created successfully.");
      }
      return res.status(404).send("Error: The review has not been created.");
    } catch (e) {
      console.log(e);
    }
};

module.exports = newReview;
