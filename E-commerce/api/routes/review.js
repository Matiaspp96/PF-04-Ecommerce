const { Router } = require("express");
const router = Router();
const newReview = require("../controllers/review");

router.post("/", newReview);

module.exports = router;
