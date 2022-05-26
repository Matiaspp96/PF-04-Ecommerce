const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },

    punctuation: { type: Number, required: true },
    opinion: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("review", ReviewSchema);
