const express = require("express");
const cors = require("cors");

const app = express();

require("./connection/connection");

const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(1000, () => {
  console.log("server started");
});

