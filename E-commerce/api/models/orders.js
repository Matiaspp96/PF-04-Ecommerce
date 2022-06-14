const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    buyer: {
      ref: "users",
      type: mongoose.Types.ObjectId,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    date: String,
    products: [
      {
        _id: {
          ref: "products",
          type: mongoose.Types.ObjectId,
        },
        name: String,
        price: Number,
        description: String,
        quantity: Number,
        description: String,
        image: String,
        required: false,
      },
    ],

    statusPay: {
      type: String,
      default: "payment not started",
      required: false,
    },
    statusPurchase: {
      type: String,
      default: " payment in process",
      required: false,
    },
    shipping: {
      street: String,
      state: String,
      number: Number,
      floor: String,
      zip: Number,
      between: String,
      required: false,
    },
    cost: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    payment: {
      type: String,
      default: "",
      required: false,
    },
    paymentId: {
      type: String
    },
    merchant_id: { 
      type: String 
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = mongoose.model("orders", OrderSchema);
