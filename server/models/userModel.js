const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  homeItems: [
    {
      roomName: {
        type: String,
      },
      roomContainers: [
        {
          containerName: {
            type: String,
          },
          containerItems: [
            {
              itemName: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
