import { listCategories } from "../dbControllers/categories.js";

export const getCategories = async (req, res, next) => {
  try {
    const allCategories = await listCategories();
    res.json({
      status: "success",
      code: 200,
      data: { allCategories },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
