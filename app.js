import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

export const App = express();
const formatsLogger = App.get("env") === "development" ? "dev" : "short";
App.use(morgan(`${formatsLogger}`));
App.use(cors());
App.use(express.json());
App.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Use api on routes`,
    data: "Not found",
  });
});

App.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});
