import mongoose from "mongoose";
const Schema = mongoose.Schema;
const dateNow = new Date().toString();
export const transaction = new Schema(
  {
    transactionDate: {
      type: String,
      default: dateNow,
    },
    typeOfTransaction: {
      type: String,
      enum: ["Income", "Expense"],
      default: "Expense",
    },
    categoryId: {
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
