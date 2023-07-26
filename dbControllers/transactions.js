import { Transaction } from "../models/transactions.js";

export const listTransactions = async (query, userId) => {
  const { page, limit } = query;
  return Transaction.find({ owner: userId })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ transactionDate: 1 });
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
