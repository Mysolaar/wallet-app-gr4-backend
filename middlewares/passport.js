import passport from "passport";
import passportJWT from "passport-jwt";
import process from "node:process";
import * as dotenv from "dotenv";
import { User } from "../models/user.js";
dotenv.config();

const secretWord = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secretWord,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

export default passport.use(
  new Strategy(params, function (payload, done) {
    User.findById(payload.id)
      .then((user) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((error) => done(error));
  })
);
