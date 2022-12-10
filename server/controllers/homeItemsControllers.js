const User = require("../models/userModel");

exports.addNewItem = (req, res) => {
  let userId = req.body.userId;
  let roomName = req.body.roomName;
  let containerName = req.body.containerName;
  let itemName = req.body.itemName;

  let item = {
    itemName,
  };

  let container = {
    containerName,
    containerItems: [item],
  };
  let room = {
    roomName,
    roomContainers: [container],
  };
  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      let roomIsAdded = user.homeItems.find(
        (room) => room.roomName === roomName
      );
      // If room is already exist
      if (roomIsAdded) {
        let containerIsAdded = roomIsAdded.roomContainers.find(
          (container) => container.containerName === containerName
        );
        // If container is already exist
        if (containerIsAdded) {
          User.updateOne(
            {
              _id: userId,
              "homeItems.roomName": roomName,
              "homeItems.roomContainers.containerName": containerName,
            },
            { $push: { "homeItems.$.roomContainers.$[i].containerItems": item } },
            { arrayFilters: [{
              "i._id": containerIsAdded._id,

            }] },
            (err, result) => {
              console.log(result);
              if (err) {
                console.log(err);
                res.send(err);
              } else {
                res.send("success");
              }
            }
          );
          // If container not exist (create new room)
        } else {
          User.updateOne(
            { _id: userId, "homeItems.roomName": roomName },
            { $push: { "homeItems.$.roomContainers": container } },
            (err, room) => {
              if (err) {
                res.send(err);
              } else {
                res.send("success");
              }
            }
          );
        }
        // If room not exist (create new room)
      } else {
        User.updateOne(
          { _id: userId },
          { $push: { homeItems: room } },
          (err) => {
            if (err) {
              res.send(err);
            } else {
              res.send("success");
            }
          }
        );
      }
    }
  });
};

exports.searchItem = (req, res) => {
  let itemToSearch = req.body.searchFor;
  let user = {};
  User.find({ firstName: "Fady" }, (err, result) => {
    user = { ...result[0]._doc };
    let foundItem = user.homeItems.filter((item) =>
      item.itemName.includes(itemToSearch)
    );
    console.log(itemToSearch);
    console.log(foundItem);
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
