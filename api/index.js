import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/magimbi-estate";

const app = express();

// Mouting Routes
app.use("/api/user", userRouter);

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
