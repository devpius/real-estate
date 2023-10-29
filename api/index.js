import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/magimbi-estate";

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
