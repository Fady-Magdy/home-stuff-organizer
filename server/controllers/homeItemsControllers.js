const User = require("../models/userModel");

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

exports.deleteRoom = (req, res) => {
  let userId = req.body.userId;
  let roomId = req.body.roomId;
  User.updateOne(
    { _id: userId },
    { $pull: { homeItems: { _id: roomId } } },
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.send(result);
    }
  );
};
