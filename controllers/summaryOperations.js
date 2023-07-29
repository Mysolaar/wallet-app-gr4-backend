import {
  filterIncomeTransactions,
  filterExpenseTransactions,
  findTransactionsByTypeAndDate,
} from "../dbControllers/transactions.js";

export const monthlyBalance = async (req, res, next) => {
  const dateNow = new Date().toISOString();
  const { date = dateNow } = req.query;
  const { id } = req.user;
  const slicedDate = date.slice(5, 8) + date.slice(0, 4);
  try {
    const incomeTransactions = await findTransactionsByTypeAndDate(
      slicedDate,
      "Income",
      id
    );

    const incomeValue = incomeTransactions
      .map((transaction) => transaction.amountOfTransaction)
      .reduce((previousValue, number) => {
        return previousValue + number;
      }, 0);

    const expenseTransactions = await findTransactionsByTypeAndDate(
      slicedDate,
      "Expense",
      id
    );

    const expenseValue = expenseTransactions
      .map((transaction) => transaction.amountOfTransaction)
      .reduce((previousValue, number) => {
        return previousValue + number;
      }, 0);

    console.log("expenseValue", expenseValue);

    const balanceForMonth = Number(incomeValue - expenseValue);
    const usedCategoryIds = expenseTransactions
      .map((transaction) => transaction.categoryId)
      .filter(
        (categoryId, index, array) => array.indexOf(categoryId) === index
      );

    let categoryIdValues = [];
    for (const categoryId of usedCategoryIds) {
      const valueByCategory = expenseTransactions
        .filter((transaction) => transaction.categoryId === categoryId)
        .map((transaction) => transaction.amountOfTransaction)
        .reduce((previousValue, number) => {
          return previousValue + number;
        }, 0);
      categoryIdValues.push(valueByCategory);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        incomeValue,
        expenseValue,
        balanceForMonth,
        usedCategoryIds,
        categoryIdValues,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
