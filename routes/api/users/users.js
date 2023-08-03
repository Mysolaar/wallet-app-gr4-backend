// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       required:
//  *         - email
//  *         - password
//  *         - verificationToken
//  *       properties:
//  *         _id:
//  *           type: string
//  *           description: User's ID generated by the database
//  *         email:
//  *           type: string
//  *           description: Email address of the user
//  *         password:
//  *           type: string
//  *           description: User's password
//  *         username:
//  *           type: string
//  *           description: Username
//  *         token:
//  *           type: string
//  *           description: Token generated once the user is logged-in
//  *         verify:
//  *           type: boolean
//  *           description: Is the user verified?
//  *         verificationToken:
//  *           type: string
//  *           description: Token generated for the purpose of the verification
//  *         balance:
//  *           type: number
//  *           description: User's balance
//  *
//  *       example:
//  *         _id: 64bfd99332de0ddca4aff25d
//  *         email: matisiciarz@gmail.com
//  *         username: Mati
//  *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzU3ZWJlMjhlYzczN2EzZTUxMzhkZSIsImlhdCI6MTY5MDgyMjA0MSwiZXhwIjoxNjkwOTA4NDQxfQ.3Uocm1qZZsEkKTtkhTeSaTzHaHhG-zplP_wespfVbvQ
//  *         verify: true
//  *         verificationToken: null
//  *         balance: 1000
//  *         password: $2a$06$4K61sSXMytigCJF.HOqf/.J3TNyosdqoX3Nrxbl3huGVPUMpA0Buu
//  *         createdAt: 2023-07-25T14:17:55.340+00:00
//  *         updatedAt: 2023-07-31T17:22:32.880+00:00
//  *
//  *     CurrentUser:
//  *       type: object
//  *       required:
//  *         - id
//  *         - email
//  *         - username
//  *         - balance
//  *       properties:
//  *         _id:
//  *           type: string
//  *           description: User's ID generated by the database
//  *         email:
//  *           type: string
//  *           description: Email address of the user
//  *         password:
//  *           type: string
//  *           description: User's password
//  *         username:
//  *           type: string
//  *           description: Username
//  *         token:
//  *           type: string
//  *           description: Token generated once the user is logged-in
//  *         verify:
//  *           type: boolean
//  *           description: Is the user verified?
//  *         verificationToken:
//  *           type: string
//  *           description: Token generated for the purpose of the verification
//  *         balance:
//  *           type: number
//  *           description: User's balance
//  *
//  *       example:
//  *         _id: 64bfd99332de0ddca4aff25d
//  *         email: matisiciarz@gmail.com
//  *         username: Mati
//  *         balance: 1000
//  *
//  *     RegisterUser:
//  *       type: object
//  *       required:
//  *         - email
//  *         - password
//  *         - username
//  *       properties:
//  *         _id:
//  *           type: string
//  *           description: User's ID generated by the database
//  *         email:
//  *           type: string
//  *           description: Email address of the user
//  *         password:
//  *           type: string
//  *           description: User's password
//  *         username:
//  *           type: string
//  *           description: Username
//  *         token:
//  *           type: string
//  *           description: Token generated once the user is logged-in
//  *         verify:
//  *           type: boolean
//  *           description: Is the user verified?
//  *         verificationToken:
//  *           type: string
//  *           description: Token generated for the purpose of the verification
//  *         balance:
//  *           type: number
//  *           description: User's balance
//  *
//  *       example:
//  *         email: matisiciarz@gmail.com
//  *         username: Mati
//  *         password: ********
//  *
//  *     Verify:
//  *       type: object
//  *       required:
//  *         - token
//  *       properties:
//  *         _id:
//  *           type: string
//  *           description: User's ID generated by the database
//  *         email:
//  *           type: string
//  *           description: Email address of the user
//  *         password:
//  *           type: string
//  *           description: User's password
//  *         username:
//  *           type: string
//  *           description: Username
//  *         token:
//  *           type: string
//  *           description: Token generated once the user is logged-in
//  *         verify:
//  *           type: boolean
//  *           description: Is the user verified?
//  *         verificationToken:
//  *           type: string
//  *           description: Token generated for the purpose of the verification
//  *         balance:
//  *           type: number
//  *           description: User's balance
//  *
//  *       example:
//  *         email: matisiciarz@gmail.com
//  *         username: Mati
//  *         password: ********
//  */

// /**
//  * @swagger
//  * tags:
//  * - name: User
//  *   description: The users managing API
//  * - name: Transactions
//  *   description: The transactions managing API
//  * - name: Summary
//  *   description: The summary managing API
//  * paths:
//  *   /users/current:
//  *    get:
//  *     tags:
//  *       - User
//  *     summary: Shows current user
//  *     content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/CurrentUser'
//  *         application/xml:
//  *           schema:
//  *             $ref: '#/components/schemas/CurrentUser'
//  *         application/x-www-form-urlencoded:
//  *           schema:
//  *             $ref: '#/components/schemas/CurrentUser'
//  *     required: true
//  *    responses:
//  *     '200':
//  *         description: Successful operation
//  *         content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/CurrentUser'
//  *         application/xml:
//  *           schema:
//  *             $ref: '#/components/schemas/CurrentUser'
//  *         application/x-www-form-urlencoded:
//  *           schema:
//  *             $ref: '#/components/schemas/CurrentUser'
//  *
//  *   /users/auth/register:
//  * post:
//  *     tags:
//  *       - User
//  *     summary: Register new user
//  *     content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/RegisterUser'
//  *         application/xml:
//  *           schema:
//  *             $ref: '#/components/schemas/RegisterUser'
//  *         application/x-www-form-urlencoded:
//  *           schema:
//  *             $ref: '#/components/schemas/RegisterUser'
//  *     required: true
//  *     responses:
//  *       '201':
//  *         description: Registration successful! Verification e-mail has just been sent, please verify your e-mail.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/RegisterUser'
//  *       '400':
//  *         description: Missing field
//  *       '409':
//  *         description: Bad credentials
//  *
//  *   /users/verify/:verificationToken
//  * post:
//  *     tags:
//  *       - User
//  *     summary: Verify email
//  *     content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Verify'
//  *         application/xml:
//  *           schema:
//  *             $ref: '#/components/schemas/Verify'
//  *         application/x-www-form-urlencoded:
//  *           schema:
//  *             $ref: '#/components/schemas/Verify'
//  *     required: true
//  *     responses:
//  *       '201':
//  *         description: Verification successful, please log-in
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Verify'
//  *
//  *   /users/verify/:verificationToken
//  * post:
//  *     tags:
//  *       - User
//  *     summary: Resend verification email
//  *     content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Verify'
//  *         application/xml:
//  *           schema:
//  *             $ref: '#/components/schemas/Verify'
//  *         application/x-www-form-urlencoded:
//  *           schema:
//  *             $ref: '#/components/schemas/Verify'
//  *     required: true
//  *     responses:
//  *       '201':
//  *         description: Verification email sent
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Verify'
//  *       '400':
//  *         description: Missing required field email
//  *       '400':
//  *         description: Verification has already been passed, please log-in
//  *
//  */

import express from "express";
export const usersRouter = express.Router();
import {
  registration,
  login,
  logout,
  verifyEmail,
  secondVerifyEmail,
  auth,
} from "../../../controllers/authOperations.js";
import { currentUser } from "../../../controllers/usersOperations.js";

usersRouter.get("/current", auth, currentUser);

usersRouter.post("/auth/register", registration);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify/", secondVerifyEmail);

usersRouter.post("/auth/login", login);

usersRouter.post("/auth/logout", auth, logout);
