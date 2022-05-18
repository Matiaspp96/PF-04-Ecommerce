const { Router } = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const orderRouter = require("./order");
const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);

module.exports = router;