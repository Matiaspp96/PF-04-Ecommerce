const { Router } = require("express");
const router = Router();
const {
  getReview,
  getReviews,
  newReview,
  deleteReview,
} = require("../controllers/review");
const validatorReview = require("../validators/review");

router.get("/", getReviews);
router.get("/:id", getReview);
router.post("/:idProduct/", validatorReview, newReview);
router.delete("/:id", deleteReview);

module.exports = router;
