import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";
import process from "node:process";
import * as dotenv from "dotenv";
import passportConfig from "./middlewares/passport.js";
import { usersRouter } from "./routes/api/users/users.js";
import { transactionsRouter } from "./routes/api/transactions/transactions.js";
import { summaryRouter } from "./routes/api/transactions/summary.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
dotenv.config();

export const App = express();
const formatsLogger = App.get("env") === "development" ? "dev" : "short";
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/api/users/*.js", "./routes/api/transactions/*.js"],
};

const specs = swaggerJsdoc(options);
App.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
App.use(morgan(`${formatsLogger}`));
App.use(cors());
App.use(express.json());
App.use(express.static(path.join(process.cwd(), "public")));
passportConfig;
App.use("/api/users", usersRouter);
App.use("/api/transactions", transactionsRouter);
App.use("/api", summaryRouter);

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
