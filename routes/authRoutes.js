import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "Такая почта уже есть" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword }); //пароль в БД теперь захешеный(для безопасности)
    await user.save();
    res.status(201).json({ message: "Пользователь успешно зарегестрирован" });
  } catch (e) {
    res.status(500).json({ message: "Сервер не работает" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Такого пользователя нет" });
    }
    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) {
      return res.status(400).json({ message: "Неверный пароль" });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      config.get("jwtSecret"), // передаём секрет по которму сможем аутентифицироваться
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Logged in successfully 😊 👌" });

    // res.json({ accessToken, userId: user._id });
    // res.cookie("auth-token", accessToken);
    // res.send("Set Cookie");
  } catch (e) {
    res.status(500).json({ message: "Сервер не работает" });
  }
});

authRouter.post("/logout", async (req, res) => {});
