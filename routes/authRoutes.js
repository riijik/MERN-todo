import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../models/Token.js";
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
    const accessToken = jwt.sign({ userId: user._id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
    // const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
    //   expiresIn: "30d",
    // });
    // const refreshTokenData = await Token.findOne({user: user._id})
    // if (refreshTokenData) {
    //   refreshTokenData.refreshToken = refreshToken
    //   await refreshTokenData.save()
    // }
    
    res.json({ accessToken, userId: user._id });
  } catch (e) {
    res.status(500).json({ message: "Сервер не работает" });
  }
});

authRouter.post("/logout", async (req, res) => {});

authRouter.get("/refresh", async (req, res) => {});
