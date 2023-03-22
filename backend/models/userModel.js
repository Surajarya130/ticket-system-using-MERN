// The require('mongoose') create an instance of Mongoose which return a single object
const mongoose = require("mongoose");

// userSchema is shape of the document
// type: String is schema type
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Enter Your Email"],
      uinque: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Please Add Pass"],
    },
  },
  {
    // It will auto write createdAt and updatedAt
    timestamps: true,
  }
);

// Users is named for mongoose model
// const user = mongoose.model("Users", userSchema);
// module.exports = user;
module.exports = mongoose.model("User", userSchema);
