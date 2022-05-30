require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./config/mongo");
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('<h2>Deploy listo</h2>')
})

app.use("/api", require("./routes"));

app.listen(port, () =>
  console.log(`linsten port ${port}`)
);
dbConnectNoSql();