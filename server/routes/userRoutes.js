import express from "express";
import {
  deleteUser,
  login,
  protectTo,
  signUp,
  verifyOtp,
} from "../controllers/authController.js";

const userRoutes = express.Router();

userRoutes.route("/signup").post(signUp);
userRoutes.route("/verify").post(verifyOtp);
userRoutes.route("/login").post(login);
userRoutes.route("/protect").post(protectTo);

userRoutes.route("/deleteall").delete(deleteUser);

export default userRoutes;
