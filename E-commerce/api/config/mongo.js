const mongoose = require('mongoose')

const dbConnect = () => {
    mongoose
  .connect(process.env.uri)
  .then(() => console.log('connected'))
  .catch((err) => {
    console.log(err);
  });
}

module.exports = dbConnect
