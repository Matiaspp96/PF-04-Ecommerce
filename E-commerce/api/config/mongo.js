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
  .then(() => console.log('listo'))
  .catch((err) => {
    console.log(err);
  });
}
>>>>>>> 88814a90c600e50897e9fa29a347b5ab597b1e3f

module.exports = dbConnect;
