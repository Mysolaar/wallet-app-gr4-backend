import { App } from "./App.js";
import mongoose from "mongoose";
import process from "node:process";
import * as dotenv from "dotenv";
import colors from "colors";
dotenv.config();

const uriDb = process.env.MONGO_URI;
const connection = mongoose.connect(uriDb);
connection
  .then(() => {
    console.log(colors.yellow("Database connecting..."));
    App.listen(3000, () => {
      console.log(
        colors.green(
          "Database connection successful and server is running on port 3000"
        )
      );
    });
  })
  .catch((error) => {
    console.log(
      colors.red(`Server not running. Error message: ${error.message}`)
    );
    process.exit(1);
  });
process.on("SIGINT", () => {
  mongoose.disconnect();
  console.log(colors.magenta("Database disconnected"));
});
