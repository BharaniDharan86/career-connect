import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoDBUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoDBUri)
  .then(() => {
    console.log("Database connected successfully!!");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Application is running on PORT ${PORT}`);
});
