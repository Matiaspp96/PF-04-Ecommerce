const { Router } = require("express");
const authRouter = require("./auth");
const categoryRouter = require("./category");
const orderRouter = require("./order");
const productRouter = require("./product");
const userRouter = require("./user");
const reviewRouter = require("./review");
const cartRouter = require("./cart");
const paymentRouter = require("./payments");
const router = Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/reviews", reviewRouter);
router.use("/payments", paymentRouter);
router.use("/cart", cartRouter);

module.exports = router;
