import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const category = new Schema(
  {
    name: {
      type: String,
    },
    categoryColor: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
export const Category = mongoose.model("category", category);
