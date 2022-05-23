const { Router } = require("express");
const authRouter = require("./auth");
const categoryRouter = require("./category");
const orderRouter = require("./order");
const productRouter = require("./product");
const userRouter = require("./user");
const reviewRouter = require("./review");
const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);
router.use("/review", reviewRouter);

module.exports = router;
