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

export const google = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = new User({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  }
};
