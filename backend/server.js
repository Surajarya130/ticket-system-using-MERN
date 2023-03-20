const express = require("express");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
