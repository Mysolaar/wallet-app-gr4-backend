import jwt from "jsonwebtoken";
import passport from "passport";
import process from "node:process";
import * as dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user.js";
import { removeUser, updateUser } from "../dbControllers/users.js";

dotenv.config();
const secretWord = process.env.SECRET;

export const registration = async (req, res, next) => {
  const { email, password, username } = req.body;
  if (!email || !password)
    return res.status(400).json({ status: "error", message: "missing field" });
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Bad credentials",
      data: "Conflict",
    });
  }
  try {
    const verificationToken = uuidv4();
    const newUser = new User({
      email,
      username,
      verificationToken,
      balance: 0,
    });
    newUser.setPassword(password);
    await newUser.save();
    const { id, balance } = newUser;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const myEmail = process.env.MY_EMAIL;
    const verificationEmail = {
      to: [myEmail, { email }],
      from: myEmail,
      subject: "Wallet app verification email",
      text: `Please use this token for verification: ${verificationToken}`,
      html: `Please use this token for verification: <strong>${verificationToken}</strong>`,
    };
    await sgMail.send(verificationEmail);
    res.status(201).json({
      status: "Success",
      code: 201,
      message:
        "Registration successful! Verification e-mail has just been sent, please verify your e-mail",
      data: { newUser: { id, email, username, balance, verificationToken } },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user)
    return res.status(404).json({ status: "error", message: "User not found" });
  try {
    await updateUser(user.id, { verificationToken: null, verify: true });
    res.json({
      status: "Verification successful, please log-in",
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};
export const secondVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ status: "error", message: "missing required field email" });
  const user = await User.findOne({ email });
  if (user.verify)
    return res
      .status(400)
      .json({ message: "Verification has already been passed, please log-in" });
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const myEmail = process.env.MY_EMAIL;
    const verificationEmail = {
      to: [myEmail, { email }],
      from: myEmail,
      subject: "Wallet app verification email",
      text: `Please use this token for verification:${user.verificationToken}`,
      html: `Please use this token for verification: <strong>${user.verificationToken}</strong>`,
    };
    await sgMail.send(verificationEmail);
    res.json({ code: 200, message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ status: "error", message: "missing field" });
  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password) || !user.verify) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message:
        "Incorrect login or password or you have not verified your email yet. If you have not verified yet, please check your e-mail box or go to 'api/users/verify' to get second verify email",
      data: "Bad credentials",
    });
  }
  try {
    const { id, email, username, balance } = user;
    const payload = { id: id };
    const token = jwt.sign(payload, secretWord, { expiresIn: "1d" });
    await updateUser(id, { token: token });
    res.header("Authorization", `Bearer ${token}`);
    res.json({
      status: "Success",
      code: 200,
      data: { token: token, user: { id, email, username, balance } },
    });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    await updateUser(req.user.id, { token: null });
    res.json({
      status: "No content",
      code: 204,
      data: "Not found",
    });
  } catch (error) {
    next(error);
  }
};
export const signout = async (req, res, next) => {
  if (!req.user.id)
    return res.status(404).json({ status: "error", message: "User not found" });
  try {
    await removeUser(req.user.id);
    res.json({
      status: "No content",
      code: 204,
      data: "Not found",
    });
  } catch (error) {
    next(error);
  }
};
export const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!user || err || user.token !== token || !token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
