const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const ticketRouter = require("./routes/ticketRoutes");
const userRouter = require("./routes/userRoutes");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// Connect to db
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
