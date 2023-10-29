import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({ username, email, password: hashedPassword });
  const user = await newUser.save();
  res.status(201).json({ message: "user created successfully", data: user });
};
