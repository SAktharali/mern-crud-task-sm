const express = require("express");
const cors = require("cors");
const app = express();

// dotenv config
const dotenv = require("dotenv");
dotenv.config();

//  MongoDB connection
const connectDB = require("./config/db");
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes

app.use("/api/users",require("./routes/userRoutes.js"))

const port = process.env.PORT || 7000;

// Listen to port
app.listen(port, () => {
  console.log(`Server running in mode on port ${port}`);
});
