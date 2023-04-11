const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select the prodyuct"],
      enum: ["iPhone", "MacBook Pro", "Android", "Monitor", "Macbook Air"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Decription also"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "opened", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
