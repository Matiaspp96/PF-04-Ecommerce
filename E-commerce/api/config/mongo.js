const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() =>
      console.log("******Conectado a base de datos MongoDB Compas****")
    )
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;