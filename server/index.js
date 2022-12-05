const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const data = require("./data/data.json");
const device = require("express-device");
const {
  visitorRoutes,
  userRoutes,
  homeItemsRoutes,
} = require("./routes/index");

const PORT = process.env.PORT || 443;

app.use(cors());
require("dotenv").config();
app.use(device.capture());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(visitorRoutes);
app.use(userRoutes);
app.use(homeItemsRoutes);

const DatabaseLink = process.env.DatabaseLink;
mongoose.connect(DatabaseLink, () => console.log("Database Connected..."));

app.get("/", (req, res) => {
  res.send("Backend Home");
});

app.get("/api", (req, res) => {
  res.send("API Home");
});

app.get("/api/items", (req, res) => {
  res.send(data);
});

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}...`));

module.exports = app;
