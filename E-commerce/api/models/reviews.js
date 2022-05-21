const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      ref: "user",
      type: mongoose.Types.ObjectId,
    },
    punctuation: { type: Number, required: true },
    opinion: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    modified: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("review", ReviewSchema);
