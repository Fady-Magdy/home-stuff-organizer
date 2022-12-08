const Users = require("../models/userModel");
const User = require("../models/userModel");

exports.addNewUser = (req, res) => {
  newUser = req.body;
  User.create(newUser);
  res.status(200).send(newUser);
};

exports.loginUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let userData = {};
  User.findOne({ email: email }, (err, person) => {
    if (err) {
      res.send(err);
    } else {
      if (!person) {
        return res.send("not found");
      }
      if (person.password === password) {
        userData = person;
        res.send(userData);
      } else {
        res.send("password wrong");
      }
    }
  });
};

exports.getUserData = (req, res) => {
  let userId = req.body.userId
  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user) {
      res.send(user);
    } else {
      res.send("user not found");
    }
  });
};
