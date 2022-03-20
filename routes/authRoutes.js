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
    const user = new User({ email, password: hashedPassword });
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
    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Сервер не работает" });
  }
});
