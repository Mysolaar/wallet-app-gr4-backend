import mongoose from "mongoose";
const Schema = mongoose.Schema;
const dateNow = new Date().toISOString();
const dateShort = dateNow.slice(4, 7) + dateNow.slice(11, 15);
export const transaction = new Schema(
  {
    transactionDate: {
      type: String,
      default: dateNow,
    },
    transactionDateShort: {
      type: String,
      default: dateShort,
    },
    typeOfTransaction: {
      type: String,
      enum: ["Income", "Expense"],
      default: "Expense",
    },
    categoryId: {
      type: String,
    },
    category: {
      type: String,
    },
    comment: {
      type: String,
      default: "",
    },
    amountOfTransaction: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);
export const Transaction = mongoose.model("transaction", transaction);
