import express from "express";
export const summaryRouter = express.Router();
import { auth } from "../../../controllers/authOperations.js";
import { getCategories } from "../../../controllers/categoriesOperations.js";
import { monthlyBalance } from "../../../controllers/summaryOperations.js";
import { findTransactionsByTypeAndDate } from "../../../dbControllers/transactions.js";

summaryRouter.get("/transaction-categories", auth, getCategories);

summaryRouter.get("/transactions-summary", auth, monthlyBalance);
