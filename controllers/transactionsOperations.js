import {
  addTransaction,
  countTransaction,
  getTransactionById,
  listTransactions,
  removeTransaction,
  updateTransaction,
} from "../dbControllers/transactions.js";
import { getCategoryByName } from "../dbControllers/categories.js";
import { updateUserBalance } from "../dbControllers/users.js";

export const add = async (req, res, next) => {
  const {
    typeOfTransaction,
    category = "Income",
    amountOfTransaction = Number(amountOfTransaction),
    transactionDate,
    comment,
  } = req.body;
  if (!amountOfTransaction || !transactionDate || !typeOfTransaction)
    return res.status(400).json({ status: "error", message: "missing field" });
  try {
    const { balance } = req.user;
    const income = balance + amountOfTransaction;
    const newBalanceIncome = Number(income);
    const expense = balance - amountOfTransaction;
    const newBalanceExpense = Number(expense);
    const newBalance =
      typeOfTransaction === "Income" ? newBalanceIncome : newBalanceExpense;
    if (typeOfTransaction === "Income" && category !== "Income")
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
    if (typeOfTransaction === "Expense" && category === "Income")
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
    const updatedUser = await updateUserBalance(req.user.id, newBalance);
    const updatedBalance = Number(updatedUser.balance);
    const baseId = await getCategoryByName(category);
    const categoryId = baseId.id.toString();
    const newTransaction = await addTransaction({
      typeOfTransaction,
      categoryId,
      category,
      amountOfTransaction,
      transactionDate,
      comment,
      owner: req.user.id,
    });

    res.status(201).json({
      status: "created",
      code: 201,
      data: { newTransaction, updatedBalance },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
export const edit = async (req, res, next) => {
  const { transactionId } = req.params;
  const {
    typeOfTransaction,
    category,
    amountOfTransaction,
    transactionDate,
    comment,
  } = req.body;
  try {
    const { balance } = req.user;
    const prevTransaction = await getTransactionById(transactionId);
    const prevTransactionAmount = prevTransaction?.amountOfTransaction;
    const income = balance + amountOfTransaction - prevTransactionAmount;
    const newBalanceIncome = Number(income);
    const expense = balance - amountOfTransaction + prevTransactionAmount;
    const newBalanceExpense = Number(expense);
    const newBalance =
      typeOfTransaction === "Income" ? newBalanceIncome : newBalanceExpense;
    const updatedUser = await updateUserBalance(req.user.id, newBalance);
    const updatedBalance = Number(updatedUser.balance);
    if (typeOfTransaction === "Income" && category !== "Income")
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
    if (typeOfTransaction === "Expense" && category === "Income")
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
    const baseId = await getCategoryByName(category);
    const categoryId = baseId?.id.toString();
    const updatedTransaction = await updateTransaction(transactionId, {
      typeOfTransaction,
      categoryId,
      category,
      amountOfTransaction,
      transactionDate,
      comment,
    });
    if (updatedTransaction) {
      res.json({
        status: "success",
        code: 200,
        data: { updatedTransaction, updatedBalance, prevTransactionAmount },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found transaction id: ${transactionId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
export const remove = async (req, res, next) => {
  const { transactionId } = req.params;
  try {
    const { id, balance } = req.user;
    const transaction = await getTransactionById(transactionId);
    const { amountOfTransaction, typeOfTransaction } = transaction;
    const income = (balance - amountOfTransaction).toFixed(2);
    const newBalanceIncome = Number(income);
    const expense = (balance + amountOfTransaction).toFixed(2);
    const newBalanceExpense = Number(expense);
    const newBalance =
      typeOfTransaction === "Income" ? newBalanceIncome : newBalanceExpense;
    await updateUserBalance(id, newBalance);
    const deletingTransaction = await removeTransaction(transactionId);
    if (deletingTransaction) {
      res.json({
        status: "success",
        code: 204,
        message: "Transaction deleted, no content",
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found transaction id: ${transactionId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
export const get = async (req, res, next) => {
  const { page, limit = 7 } = req.query;
  const { id, balance } = req.user;
  try {
    const transactions = await listTransactions(req.query, id);
    const countTransactions = await countTransaction(id);
    res.json({
      status: "success",
      code: 200,
      countTransactions,
      totalPages: Math.ceil(countTransactions / limit),
      currentPage: page,
      limit,
      data: { balance, userId: id, transactions },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const getById = async (req, res, next) => {
  const { transactionId } = req.params;
  try {
    const transaction = await getTransactionById(transactionId);
    if (transaction) {
      res.json({
        status: "success",
        code: 200,
        data: { transaction },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found transaction id: ${transactionId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
