import AppError from "../utils/appError.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";
import User from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";
import { generateOTP } from "../utils/generator.js";
import { sendEmail } from "../utils/email.js";
import { decode } from "jsonwebtoken";
import { promisify } from "util";
import { htmlTemplate } from "../utils/htmlTemplate.js";
export const login = catchAsyncErr(async (req, res, next) => {
  const { email, password: userProvidedPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return next(
      new AppError(
        "Email does not exists. Please check your email",
        404,
        "Failed"
      )
    );

  const isValidPassword = await user.comparePassword(
    userProvidedPassword,
    user.password
  );

  console.log(isValidPassword);

  if (!isValidPassword)
    return next(
      new AppError(
        "Invalid password. Please check your password",
        400,
        "Failed"
      )
    );

  const token = createToken(user.id);

  res.cookie("auth_token_careerconnect", token);

  return res.status(200).json({
    stauts: "Success",
    success: true,
    email,
    message: "Logged in successfully!",
  });
});

export const signUp = catchAsyncErr(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password)
    return next(
      new AppError("Please provide all the required fields", 400, "Failed")
    );

  const isUserExists = await User.findOne({ email });

  if (isUserExists && isUserExists.isVerified)
    return next(new AppError("Email already exists", 400, "Failed"));

  console.log(isUserExists);

  if (isUserExists && isUserExists.otp !== null && !isUserExists.isVerified) {
    const newOtp = generateOTP(6);

    const updatedUserOtp = await User.findByIdAndUpdate(isUserExists.id, {
      otp: newOtp,
    });

    if (!updatedUserOtp)
      return next(
        new AppError(
          "Cannot able to create a user. Please try again later",
          400,
          "Failed"
        )
      );

    await sendEmail({
      to: email,
      subject: "Career Connect - User Verification OTP",
      html: htmlTemplate(userName, newOtp),
    });

    return res.status(200).json({
      stauts: "Success",
      success: true,
      message:
        "We have sent you 6 digit otp to your registered email id. Please verify it",
    });
  }

  const otp = generateOTP(6);

  const newUser = await User.create({ email, userName, password, otp });

  if (!newUser)
    return next(
      new AppError(
        "Cannot able to create a user. Please try again later",
        400,
        "Failed"
      )
    );

  await sendEmail({
    to: email,
    subject: "Career Connect - User Verification OTP",
    html: htmlTemplate(userName, otp),
  });

  return res.status(200).json({
    stauts: "Success",
    success: true,
    email,
    message:
      "We have sent you 6 digit otp to your registered email id. Please verify it",
  });
});

export const verifyOtp = catchAsyncErr(async (req, res, next) => {
  const { otp, email } = req.body;

  if (!otp || !email)
    return next(
      new AppError(
        "Please provide all the required fields. Email and OTP",
        400,
        "Failed"
      )
    );

  const user = await User.findOne({ email });

  if (!user) return next(new AppError("Invalid email", 404, "Failed"));

  if (user && user.isVerified)
    return next(new AppError("User already verified", 400, "Failed"));

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    {
      isVerified: true,
      isActive: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser)
    return next(
      new AppError("Cannot able to register. Please try again later", 500)
    );

  const token = createToken(updatedUser.id);

  res.cookie("auth_token_careerconnect", token);

  return res.status(200).json({
    stauts: "Success",
    success: true,
    message: "User created successfully!",
  });
});

export const protectTo = catchAsyncErr(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("Token is not provided", 400, "Failed"));
  }

  const token = req.headers.authorization.split(" ")[1];

  const { id, iat } = decode(token);
});

export const deleteUser = catchAsyncErr(async (req, res, next) => {
  const isUserDeleted = await User.deleteMany();

  if (!isUserDeleted)
    return next(new AppError("Cannot able to delete the users", 400, "Failed"));

  return res.status(200).json({
    message: "All users Deleted successfully",
  });
});
