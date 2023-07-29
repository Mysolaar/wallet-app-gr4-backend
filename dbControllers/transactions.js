import { Transaction } from "../models/transactions.js";

export const listTransactions = async (query, userId) => {
  const { page, limit } = query;
  return Transaction.find({ owner: userId })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ transactionDate: 1 });
};

export const filterIncomeTransactions = async (userId) => {
  return Transaction.find({ typeOfTransaction: "Income", owner: userId });
};

export const filterExpenseTransactions = async (userId) => {
  return Transaction.find({ typeOfTransaction: "Expense", owner: userId });
};

export const countTransaction = async (userId) => {
  return Transaction.countDocuments({ owner: userId });
};
export const filterTransaction = async (query) => {
  const { queryDate } = query;
  const date = queryDate.toString();
  return Transaction.find({ transactionDate: { $lte: date } }).sort({
    transactionDate: 1,
  });
};
export const countFilteredTransaction = async (query) => {
  const { date } = query;
  return Transaction.find({ transactionDate: { $lte: date } }).countDocuments();
};
export const getTransactionById = (transactionId) => {
  return Transaction.findOne({ _id: transactionId });
};

export const addTransaction = ({
  typeOfTransaction,
  categoryId,
  amountOfTransaction,
  transactionDate,
  comment,
  owner,
}) => {
  return Transaction.create({
    typeOfTransaction,
    categoryId,
    amountOfTransaction,
    transactionDate,
    comment,
    owner,
  });
};

export const updateTransaction = (transactionId, body) => {
  return Transaction.findByIdAndUpdate({ _id: transactionId }, body, {
    new: true,
  });
};

export const removeTransaction = (transactionId) => {
  return Transaction.findByIdAndRemove({ _id: transactionId });
};
