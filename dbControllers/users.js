import { User } from "../models/user.js";
export const listUsers = async () => {
  return User.find();
};

export const getUserById = (userId) => {
  return User.findOne({ _id: userId });
};

export const updateUser = (userId, body) => {
  return User.findByIdAndUpdate({ _id: userId }, body, {
    new: true,
    runValidators: true,
  });
};

export const removeUser = (userId) => {
  return User.findByIdAndRemove({ _id: userId });
};

export const updateUserBalance = (userId, value) => {
  return User.findByIdAndUpdate(
    { _id: userId },
    { balance: value },
    {
      new: true,
      runValidators: true,
    }
  );
};
