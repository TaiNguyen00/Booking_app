import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createError } from "../utils/error";
const nodemailer = require("nodemailer");

export const register = async (req, res, next) => {
  const { password } = req.body;
  try {

    const presuer = await User.findOne({email: req.body.email})
    if (presuer) {
      res.status(400).send("Email này đã được đăng ký")
    }
    // send email

    //
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password, salt);
    // const newUser = new User({
    //   ...req.body,
    //   password: hash,
    // });
    // await newUser.save();
    // return res.status(200).send("User has been created");
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
