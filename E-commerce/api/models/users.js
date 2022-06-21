const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    avatar: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    cart: [
      {
        ref: "products",
        type: mongoose.Types.ObjectId,
        /* autopopulate: {
          select: ["name", "image", "description", "price", "sales"],
        }, */

        quantity: Number,
      },
    ],
    orders: [
      {
        ref: "orders",
        type: mongoose.Types.ObjectId,
      },
    ],
    shoppingHistory: [
      {
        type: Array,
      },
    ],
    shipping: [{}],
    favorites: [
      {
        ref: "products",
        type: mongoose.Types.ObjectId,
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("users", UserSchema);
