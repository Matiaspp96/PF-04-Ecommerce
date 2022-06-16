require("dotenv").config();
const sessionSecret = process.env.SESSION_SECRET;
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./config/mongo");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(cookieParser(sessionSecret));
app.use(express.urlencoded({ extended: false }));

dbConnectNoSql();

const session = require("express-session");
//store session
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");

const port = process.env.PORT || 3000;

/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.HOST_CLIENT); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.HOST_CLIENT); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
const sessionDb = MongoDBStore({
  uri: process.env.uri,
  collection: "mySessions",
});

app.use(morgan("dev"));

//express-session configuration
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: sessionDb,
  })
);

app.use(passport.initialize()); //iniciamos passport
app.use(passport.session()); //se ejecuta sesion para guardar los datos del user
//strategy passport Google-Auth
require("./auth-passport/strategis/google-auth");

app.use("/api", require("./routes"));

app.listen(port, () => console.log(`linsten port ${port}`));
