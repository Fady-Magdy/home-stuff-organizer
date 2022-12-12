const User = require("../models/userModel");

exports.addRoom = (req, res) => {
  let userId = req.body.userId;
  let room = {
    roomName: req.body.newName,
  };
  User.updateOne({ _id: userId }, { $push: { homeItems: room } }, () => {});
  res.send("success");
};

exports.addContainer = (req, res) => {
  let userId = req.body.userId;
  let roomId = req.body.roomId;
  let container = {
    containerName: req.body.newName,
  };
  User.updateOne(
    { _id: userId, "homeItems._id": roomId },
    { $push: { "homeItems.$.roomContainers": container } },
    () => {}
  );
  res.send("success");
};

exports.addItem = (req, res) => {
  let userId = req.body.userId;
  let roomId = req.body.roomId;
  let containerId = req.body.containerId;
  let item = {
    itemName: req.body.newName,
  };
  User.updateOne(
    {
      _id: userId,
      "homeItems._id": roomId,
      "homeItems.roomContainers._id": containerId,
    },
    { $push: { "homeItems.$.roomContainers.$[i].containerItems": item } },
    {
      arrayFilters: [{ "i._id": containerId }],
    },
    (err, user) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.send("success");
};

exports.searchItem = (req, res) => {
  let itemToSearch = req.body.searchFor;
  let user = {};
  User.find({ firstName: "Fady" }, (err, result) => {
    user = { ...result[0]._doc };
    let foundItem = user.homeItems.filter((item) =>
      item.itemName.includes(itemToSearch)
    );
    res.send(foundItem);
  });
};

exports.getAllItems = (req, res) => {
  let userId = req.body.userId;
  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      res.send("failed");
    } else {
      res.send(user);
    }
  });
};

exports.deleteRoom = (req, res) => {
  let userId = req.body.userId;
  let roomId = req.body.roomId;
  User.updateOne(
    { _id: userId },
    { $pull: { homeItems: {_id: roomId} } },
    (err, user) => {
      if (err) {
        console.log(err);
        res.send(err)
      }
      console.log(user);
      res.send(user)
    }
  );
};
