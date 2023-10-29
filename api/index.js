import express from "express";
import "express-async-errors";

import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./utils/middleware/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/magimbi-estate";

const app = express();

// Middleware
app.use(express.json());

// Mouting Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Error middleware
app.use(errorHandler);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(3000, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`An error occured ${error}`);
  });
