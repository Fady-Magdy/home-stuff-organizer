const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, console.log(`Server is Running on Port ${PORT}...`));
