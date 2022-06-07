const { Router } = require("express");
const router = Router();
const { getReview, getReviews, newReview ,deleteReview } = require("../controllers/review");
const validatorReview = require("../validators/review");

router.get("/", getReviews);
router.get("/:id", getReview);
router.post("/:idProduct/", validatorReview, newReview);
<<<<<<< HEAD
router.delete("/:id", deleteReview)
=======

router.delete("/:id", deleteReview) ;

>>>>>>> 56eecf2d20b2c2bd0df7dbf2f7e105c4a9213391

module.exports = router;
