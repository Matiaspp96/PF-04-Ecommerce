<<<<<<< HEAD
const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(process.env.MONGO_URL))
    .catch((err) => {
      console.log(err);
    });
};
=======
const mongoose = require('mongoose')
const password = 'wercox-qEqqy8-gamdis'
const uri = `mongodb+srv://admin:${password}@cluster0.0ykiz.mongodb.net/DatabaseEcommerce`;1

const dbConnect = () => {
    mongoose
  .connect(uri)
  .then(() => console.log(process.env.MONGO_URL))
  .catch((err) => {
    console.log(err);
  });
}
>>>>>>> 11c60b279f905895892de2e2861c4c2b4ffab2c9

module.exports = dbConnect;
