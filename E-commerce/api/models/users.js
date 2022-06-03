const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, 
      select: false 
    },
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

UserSchema.methods.encryptPassword =  (password)=>{
  return   bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
UserSchema.methods.comparePassword =function(password){
 return bcrypt.compareSync(password, this.password);

};

module.exports = mongoose.model("users", UserSchema);
