import express from "express";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/career-connect/user", userRoutes);

app.use("*", (req, res, next) => {
  return res.status(404).json({
    status: "Failed",
    success: false,
    message: `The requested url: ${req.originalUrl} is not found`,
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.statusCode).json({
    status: err.status,
    success: false,
    message: err.message,
  });
});

export default app;
