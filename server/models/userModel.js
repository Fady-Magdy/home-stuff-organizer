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
  profileImage: {
    type: String,
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
              itemQuantity: {
                type: Number,
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
