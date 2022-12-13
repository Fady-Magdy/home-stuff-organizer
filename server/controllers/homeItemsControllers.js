const User = require("../models/userModel");

exports.searchItem = (req, res) => {
  res.send("Search isn't ready");
};
// --------------------------------------------------------------------------
// New
exports.newRoom = (req, res) => {
  let userId = req.body.userId;
  let room = {
    roomName: req.body.newName,
  };
  User.updateOne({ _id: userId }, { $push: { homeItems: room } }, () => {});
  res.send("success");
};

exports.newContainer = (req, res) => {
  let { userId, roomId } = req.body;
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

exports.newItem = (req, res) => {
  let { userId, roomId, containerId } = req.body;
  let item = {
    itemName: req.body.newName,
    itemQuantity: req.body.newQuantity,
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
        res.send(err);
      }
    }
  );
  res.send("success");
};
// ----------------------------------------------------------------
// Edit
exports.editRoom = (req, res) => {
  let { userId, roomId, newName } = req.body;
  User.updateOne(
    { _id: userId, "homeItems._id": roomId },
    { $set: { "homeItems.$.roomName": newName } },
    () => {}
  );
  res.send("success");
};

exports.editContainer = (req, res) => {
  let { userId, roomId, containerId, newName } = req.body;
  User.updateOne(
    {
      _id: userId,
      "homeItems._id": roomId,
      "homeItems.roomContainers._id": containerId,
    },
    {
      $set: { "homeItems.$.roomContainers.$[i].containerName": newName },
    },
    {
      arrayFilters: [{ "i._id": containerId }],
    },
    (err) => {
      if (err) {
        res.send(err);
      }
      res.send("success");
    }
  );
};

exports.editItem = (req, res) => {
  let { userId, roomId, containerId, itemId, newName, newQuantity } = req.body;
  let newItem = {
    itemName: newName,
    itemQuantity: newQuantity,
  };
  User.updateOne(
    {
      _id: userId,
      "homeItems._id": roomId,
      "homeItems.roomContainers._id": containerId,
      "homeItems.roomContainers.containerItems._id": itemId,
    },
    {
      $set: {
        "homeItems.$.roomContainers.$[i].containerItems.$[j]": newItem,
      },
    },
    {
      arrayFilters: [{ "i._id": containerId }, { "j._id": itemId }],
    },
    (err) => {
      if (err) {
        res.send(err);
      }
      res.send("success");
    }
  );
};
// ------------------------------------------------------------------
// Delete
exports.deleteRoom = (req, res) => {
  let { userId, roomId } = req.body;
  User.updateOne(
    { _id: userId },
    { $pull: { homeItems: { _id: roomId } } },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    }
  );
};

exports.deleteContainer = (req, res) => {
  let { userId, roomId, containerId } = req.body;
  User.updateOne(
    { _id: userId, "homeItems._id": roomId },
    { $pull: { "homeItems.$.roomContainers": { _id: containerId } } },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    }
  );
};

exports.deleteItem = (req, res) => {
  let { userId, roomId, containerId, itemId } = req.body;
  User.updateOne(
    {
      _id: userId,
      "homeItems._id": roomId,
      "homeItems.roomContainers._id": containerId,
    },
    {
      $pull: {
        "homeItems.$.roomContainers.$[i].containerItems": { _id: itemId },
      },
    },
    {
      arrayFilters: [{ "i._id": containerId }],
    },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    }
  );
};
