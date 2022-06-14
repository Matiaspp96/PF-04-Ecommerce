const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    reviews: [
      {
        ref: "review",
        type: mongoose.Types.ObjectId,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
    score: {
      type: Number,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: [
      {
        ref: "categories",
        type: mongoose.Types.ObjectId,
        /* autopopulate: { select: "name" }, */
      },
    ],

    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strictPopulate: false,
    autopopulate: true,
  }
);

ProductSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("products", ProductSchema);
