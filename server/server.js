const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");
const mongoose = require("mongoose");
const device = require("express-device"); // to get device type
const platform = require("platform"); // library to get mobile name
const satelize = require("satelize"); // to get visitor country and continent
const data = require("./data/data.json");
const app = express();

const visitors = require("./models/visitorModel");

function getDate() {
  let newDate = new Date();
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
}
function getTime() {
  let newDate = new Date();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let seconds = newDate.getSeconds();
  let AmPm = "";
  hours > 11 ? (AmPm = "PM") : (AmPm = "AM");
  hours > 12 ? (hours -= 12) : hours;
  hours === 0 ? (hours = 12) : hours;
  hours < 10 ? (hours = `0${hours}`) : hours;
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;
  seconds < 10 ? (seconds = `0${seconds}`) : seconds;

  return `${hours}:${minutes}:${seconds} ${AmPm}`;
}

let userCountry = "";
let userContinent = "";
let userIp = "";

require("dotenv").config();
const DatabaseLink = process.env.DatabaseLink;
mongoose.connect(DatabaseLink, () => console.log("Database Connected..."));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/.env" });
}

const PORT = process.env.PORT || 443;

app.use(device.capture());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/api/add-ip", (req, res) => {
  let ip = req.body.ip;
  userIp = ip;
  res.send(userIp);
});

app.get("/api/add-visitor-data", (req, res) => {
  if (userIp !== "") {
    satelize.satelize({ ip: userIp }, (err, payload) => {
      userCountry = `${payload.country.en}`;
      userContinent = `${payload.continent.en}`;
    });
  }

  let date = getDate();
  let time = getTime();
  let visitorData = {
    username: os.userInfo().username,
    ipAddress: userIp,
    deviceType: req.device.type,
    mobileName: platform.manufacturer || "Not Mobile",
    userCountry,
    userContinent,
    date: [date],
    time: [time],
    visitCount: 1,
  };
  visitors.findOne({ ipAddress: visitorData.ipAddress }, (err, existingIp) => {
    if (existingIp == null) {
      console.log("visitor not Exist");
      visitors.create(visitorData);
    } else {
      console.log("visitor Exist");
      visitors.updateOne(
        { ipAddress: visitorData.ipAddress },
        { $inc: { visitCount: 1 }, $push: { date: date, time: time } },
        () => {}
      );
    }
  });

  res.status(200).send(visitorData);
});

app.get("/api", (req, res) => {
  res.send("API Home");
});

app.get("/api/items", (req, res) => {
  res.send(data);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}...`));
