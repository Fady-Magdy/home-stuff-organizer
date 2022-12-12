const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  deviceType: {
    type: String,
  },
  userCountry: {
    type: String,
  },
  userContinent: {
    type: String,
  },
  date: {
    type: Array,
  },
  time: {
    type: Array,
  },
  visitCount: {
    type: Number,
  },
});

const Visitor = mongoose.model("visitors", VisitorSchema);

module.exports = Visitor;
