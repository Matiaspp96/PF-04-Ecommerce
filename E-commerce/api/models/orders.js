const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        name: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price:Number,
        paymentmethod: {
          type: String,
        },
        bill: {
          type: Number,
          required: true
      },
        status: {
          type: ["created", "inprogress", "canceled", "complete"],
          default: "created",
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("orders", OrderSchema);
