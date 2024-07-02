import AppError from "../utils/appError.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";
import User from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";

export const login = catchAsyncErr(async (req, res, next) => {
  const { email, password: userProvidedPassword } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser)
    return next(
      new AppError(
        "Email does not exists. Please check your email",
        404,
        "Failed"
      )
    );

  const isValidPassword = userProvidedPassword == findUser.password;

  if (!isValidPassword)
    return next(new AppError("Invalid password. Please check your password"));

  const token = createToken(findUser.id);

  res.cookie("auth_token_careerconnect", token);

  return res.status(200).json({
    stauts: "Success",
    success: true,
    message: "Logged in successfully",
  });
});

export const signUp = catchAsyncErr(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password)
    return next(
      new AppError("Please provide all the required fields", 400, "Failed")
    );

  const newUser = User.create({ email, userName, password });

  if (!newUser)
    return next(
      new AppError(
        "Cannot able to create a user. Please try again later",
        400,
        "Failed"
      )
    );

  const token = createToken(newUser.id);

  res.cookie("auth_token_careerconnect", token);

  return res.status(200).json({
    stauts: "Success",
    success: true,
    message: "User created successfully !!",
  });
});

export const deleteUser = catchAsyncErr(async (req, res, next) => {
  const isUserDeleted = await User.deleteMany();

  return res.status(200).json({
    message: "All users Deleted successfully",
  });
});
