const asyncHandler = require("express-async-handler");
// Get models
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc:   : Get the user ticket
// @route:  GET: /api/tickets
// @access: Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user ny id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc:   Get a single ticket by id
// @route:  GET: /api/tickets/:id
// @access: Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user by id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("No ticekt Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(ticket);
});

// @desc:   Delete a ticket by id
// @route:  Delete: /api/tickets/:id
// @access: Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user by id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("No ticket Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await ticket.deleteOne();

  res.status(200).json({ success: true });
});

// @desc:   update a ticket by id
// @route:  PUT: /api/tickets/:id
// @access: Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user ny id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Not Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedTicked = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTicked);
});

// @desc:   create a new ticket
// @route:  POST: /api/tickets
// @access: Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and desc");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "New",
  });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
