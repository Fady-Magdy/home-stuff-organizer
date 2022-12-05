const User = require("../models/userModel");

exports.addNewUser = (req, res) => {
  newUser = req.body;
  User.create(newUser);
  res.status(200).send(newUser);
};
