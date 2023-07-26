import { Category } from "../models/categories.js";
export const listCategories = async () => {
  return Category.find();
};
export const getCategoryById = (categoryId) => {
  return Category.findById({ _id: categoryId });
};
export const getCategoryByName = (category) => {
  return Category.findOne({ name: { $regex: `${category}` } }, { ObjectId: 1 });
};
