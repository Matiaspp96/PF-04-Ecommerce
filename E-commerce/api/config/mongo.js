const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(process.env.MONGO_URL))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;
