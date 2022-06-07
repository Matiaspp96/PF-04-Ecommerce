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

    status: {
      type: String,
      default: "Pending",
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
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = mongoose.model("orders", OrderSchema);

/* const mongoose = require("mongoose");
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
 */
