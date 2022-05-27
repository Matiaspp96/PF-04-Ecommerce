require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./config/mongo");
const morgan= require('morgan')
app.use(cors());
app.use(express.json());

const session = require('express-session');
const passport = require('passport');

const port = process.env.PORT || 3000;

require('./auth-passport/strategis/google-auth');
require('./auth-passport/strategis/local-auth');

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret:'sessionSecrete', 
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize()); //iniciamos passport
app.use(passport.session());  //se ejecuta sesion para guardar los datos del user

app.use("/api", require("./routes"));

app.listen(port, () =>
  console.log(`linsten port ${port}`)
);
dbConnectNoSql();