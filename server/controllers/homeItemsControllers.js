const User = require("../models/userModel");

exports.addNewItem = (req, res) => {
  let itemData = req.body;
  console.log(req.body);
  User.updateOne(
    { firstName: "Fady" },
    { $push: { homeItems: itemData } },
    () => {}
  );
  res.send(req.body);
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
