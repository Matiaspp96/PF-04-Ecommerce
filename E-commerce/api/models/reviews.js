const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    product: {
      ref: "products",
      type: mongoose.Types.ObjectId,
    },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],

    punctuation: { type: Number, required: true },
    opinion: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strictPopulate: false,
  }
);
module.exports = mongoose.model("review", ReviewSchema);
