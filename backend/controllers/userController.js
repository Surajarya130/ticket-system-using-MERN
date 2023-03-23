const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc:   Register a user
// @route:  /api/users/
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation part
  if (!name || !email || !password) {
    res.status();
    throw new Error("Enter all fields");
  }

  // Find if user exists already
  const userExists = await User.findOne({
    email: req.body.email,
  });

  if (userExists) {
    res.status(400);
    throw new Error("User exist already");
  }

  // hash the pass
  const saltRound = 10;
  // bcrypt.genSalt(saltRound, (err, salt) => {
  //   bcrypt.hash(req.body.pass, salt, (err, hash) => {
  //     console.log(hash);
  //   });
  // });

  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Invalid data");
  }
});

// @desc:   Login a user
// @route:  /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  // check user pass and hashed pass match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new error("Invalid Email or pass");
  }
});

// @desc:   Get the current user
// @route:  /api/users/me
// @access: Private
const getMe = asyncHandler(async (req, res) => {
  // res.send(req.user.id);

  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
