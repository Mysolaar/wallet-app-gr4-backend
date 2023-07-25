import express from "express";
export const usersRouter = express.Router();
import {
  registration,
  login,
  logout,
  verifyEmail,
  secondVerifyEmail,
  auth,
} from "../../../controllers/authOperations.js";
import { currentUser } from "../../../controllers/usersOperations.js";

usersRouter.get("/current", auth, currentUser);

usersRouter.post("/auth/register", registration);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify/", secondVerifyEmail);

usersRouter.post("/auth/login", login);

usersRouter.post("/auth/logout", auth, logout);
