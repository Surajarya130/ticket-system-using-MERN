const registerUser = (req, res) => {
  res.send("Register Route from user controller");
};

const loginUser = (req, res) => {
  res.send("Login Route");
};

module.exports = {
  registerUser,
  loginUser,
};
