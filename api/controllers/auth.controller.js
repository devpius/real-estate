import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorFunc } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  const user = await newUser.save();
  res
    .status(201)
    .json({ success: true, message: "user created successfully", data: user });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email });

  if (!validUser) {
    const error = errorFunc(404, "Wrong credentials");
    return res.status(401).json({ success: false, message: error.message });
  }

  const validPassword = await bcrypt.compare(password, validUser.password);

  if (!validPassword) {
    const error = errorFunc(401, "Wrong credentials");
    return res.status(401).json({ success: false, message: error.message });
  }

  const token = jwt.sign({ id: validUser.id }, process.env.SECRET_KEY);
  const { password: pass, ...rest } = validUser._doc;

  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(rest);
};
