export const currentUser = async (req, res, next) => {
  const { email, id, username, balance } = req.user;
  try {
    res.json({
      status: "Success",
      code: 200,
      data: { id, email, username, balance },
    });
  } catch (error) {
    next(error);
  }
};
