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
<<<<<<< HEAD
router.delete("/:id", deleteReview);
=======
router.delete("/:id", deleteReview)
>>>>>>> d5bf59171301ee5450b6b2624a44b25d8f693cfd

module.exports = router;
