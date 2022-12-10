const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const device = require("express-device");
const PORT = process.env.PORT || 443;

const {
  visitorRoutes,
  userRoutes,
  homeItemsRoutes,
} = require("./routes/index");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());
require("dotenv").config();
app.use(device.capture());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DatabaseLink = process.env.DatabaseLink;
mongoose.connect(DatabaseLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("Database connected..."));

app.use(visitorRoutes);
app.use(userRoutes);
app.use(homeItemsRoutes);

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}...`));

module.exports = app;
