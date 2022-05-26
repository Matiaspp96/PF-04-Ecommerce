const { Router } = require("express");
const router = Router();
const {
  getReview,
  getReviews,
  newReview,
  getReviewUsers,
} = require("../controllers/review");
const validatorReview = require("../validators/review");

router.get("/", getReviews);
router.get("/:id", getReview);
router.get("/reviewauthor", getReviewUsers);

router.post("/", validatorReview, newReview);

module.exports = router;
