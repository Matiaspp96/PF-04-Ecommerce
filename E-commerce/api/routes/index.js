const { Router } = require("express");
const authRouter = require("./auth");
const categoryRouter = require("./category");
const orderRouter = require("./order");
const productRouter = require("./product");
const userRouter = require("./user");
const reviewRouter = require("./review");
<<<<<<< HEAD
const cartRouter = require("./cart");
=======
const paymentRouter = require("./payments");
>>>>>>> b48a3b88d66d33f6cd1aff2b92bd9c0465677708
const router = Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/reviews", reviewRouter);
<<<<<<< HEAD
router.use("/cart", cartRouter);
=======
router.use("/payments", paymentRouter);
>>>>>>> b48a3b88d66d33f6cd1aff2b92bd9c0465677708

module.exports = router;
