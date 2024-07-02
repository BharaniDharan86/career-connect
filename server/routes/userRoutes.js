import express from "express";
import { login, signUp } from "../controllers/authController.js";

const userRoutes = express.Router();

userRoutes.route("/signup").post(signUp);
userRoutes.route("/login").post(login);

export default userRoutes;
