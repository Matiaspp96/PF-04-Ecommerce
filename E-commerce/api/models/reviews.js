const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ReviewSchema = new mongoose.Schema(
  {
    product: {
      ref: "product",
      type: ObjectId,
    },
    user: {
      ref: "user",
      type: ObjectId,
    },
    punctuation: Number,
    opinion: String,
    date: String,
    modified: String,
  },
  {
    timestamps: false,
    versionKey: false,
  }
);
module.exports = mongoose.model("review", ReviewSchema);
