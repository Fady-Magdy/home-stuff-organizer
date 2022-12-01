const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const data = require("./data/data.json");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/api/items", (req, res) => {
  res.send(data);
});

app.use(express.static(path.join(__dirname, "../client", "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}...`));
