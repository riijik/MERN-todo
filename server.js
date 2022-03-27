import mongoose from "mongoose";
import express from "express";
import { taskRouter } from "./routes/taskRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const MONGO_URL = "mongodb://127.0.0.1:27017/todo";

const app = express();
app.use(express.json()); //чтобы express мог работать с json-ом
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", taskRouter);

async function startApp() {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(8000, () => console.log(`Shalom ti na 8000 porte`));
    console.log(`MongoDB Connected: ${MONGO_URL}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startApp();
