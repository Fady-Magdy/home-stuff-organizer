const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    required: true,
  },
  mobileName: {
    type: String,
    required: true,
  },
  userCountry: {
    type: String,
    required: true,
  },
  userContinent: {
    type: String,
    required: true,
  },
  date: {
    type: Array,
    required: true,
  },
  time: {
    type: Array,
    required: true,
  },
  visitCount: {
    type: Number,
    required: true,
  },
});

const visitors = mongoose.model("visitors", VisitorSchema);

module.exports = visitors;
