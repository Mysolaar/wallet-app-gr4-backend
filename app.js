import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";
import process from "node:process";
import * as dotenv from "dotenv";
import passportConfig from "./middlewares/passport.js";
import { usersRouter } from "./routes/api/users/users.js";
import { transactionsRouter } from "./routes/api/transactions/transactions.js";
dotenv.config();

export const App = express();
const formatsLogger = App.get("env") === "development" ? "dev" : "short";
App.use(morgan(`${formatsLogger}`));
App.use(cors());
App.use(express.json());
App.use(express.static(path.join(process.cwd(), "public")));
passportConfig;
App.use("/api/users", usersRouter);
App.use("/api/transactions", transactionsRouter);

App.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Use api on routes`,
    data: "Not found",
  });
});

// eslint-disable-next-line no-unused-vars
App.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});
