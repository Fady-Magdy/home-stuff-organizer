const User = require("../models/userModel");

exports.addNewUser = (req, res) => {
  newUser = req.body;
  User.create(newUser, (err, result) => {
    if (err) return res.send(err);
    res.send("success");
  });
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
  let userId = req.body.userId;
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

exports.checkEmail = (req, res) => {
  let userEmail = req.body.userEmail;
  User.findOne({ email: userEmail }, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user) {
      res.send("used");
    } else {
      res.send("not used");
    }
  });
};
