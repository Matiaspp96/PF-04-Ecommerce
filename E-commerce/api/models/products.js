const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ProductSchema = new mongoose.Schema(
  {
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
        default:0,
        required: true,
    },
    image: {
        type:String,        
        required: true,
    },
    category: {
        type: ObjectId,//Array
        ref: "categories",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("products", ProductSchema);