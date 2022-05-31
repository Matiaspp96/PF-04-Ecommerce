const mongoose = require("mongoose");
const password = 'wercox-qEqqy8-gamdis'
const uri = `mongodb+srv://admin:${password}@cluster0.0ykiz.mongodb.net/DatabaseEcommerce`;
const dbConnect = () => {
  mongoose
    .connect(uri)
    .then(() => (process.env.MONGO_URL))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;
