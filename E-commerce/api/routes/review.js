const { Router } = require("express");
const router = Router();
const { getReview, getReviews, newReview } = require("../controllers/review");
const validatorReview = require("../validators/review");

router.get("/", getReviews);
router.get("/:id", getReview);
router.post("/", validatorReview, newReview);

module.exports = router;
