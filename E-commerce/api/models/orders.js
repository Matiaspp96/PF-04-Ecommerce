const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        paymentmethod: {
          type: String,
        },
        status: {
          type: ["created", "inprogress","canceled","complete"],
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
