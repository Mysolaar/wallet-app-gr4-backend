import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const Schema = mongoose.Schema;
export const user = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      maxlength: 100,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
      type: String,
      minlength: 1,
      maxlength: 12,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [validationOfVerificationToken, "Verify token is required"],
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);
user.methods.setPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(6));
};
user.methods.validPassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};
export const User = mongoose.model("user", user);
function validationOfVerificationToken() {
  if (User.verify === false) return typeof User.verificationToken === "string";
  return User.verificationToken === null;
}
