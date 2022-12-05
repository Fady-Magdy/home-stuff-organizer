const os = require("os");
const platform = require("platform"); // library to get mobile name
const satelize = require("satelize"); // to get visitor country and continent
const visitors = require("../models/visitorModel");

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

let userCountry = "unknown";
let userContinent = "unknown";
let userIp = "unknown";

exports.addIp = (req, res) => {
  let ip = req.body.ip;
  userIp = ip;
  res.send(userIp);
};

exports.addVisitorData = (req, res) => {
  if (userIp !== "unknown") {
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
    deviceType: "req.device.type",
    mobileName: platform.manufacturer || "Not Mobile",
    userCountry,
    userContinent,
    date: [date],
    time: [time],
    visitCount: 1,
  };
  visitors.findOne({ ipAddress: visitorData.ipAddress }, (err, existingIp) => {
    if (existingIp == null) {
      visitors.create(visitorData);
    } else {
      visitors.updateOne(
        { ipAddress: visitorData.ipAddress },
        { $inc: { visitCount: 1 }, $push: { date: date, time: time } },
        () => {}
      );
    }
  });

  res.status(200).send("Data Successfully Added");
};
