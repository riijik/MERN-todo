import jwt from "jsonwebtoken";
import config from "config";

export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // "Text TOKEN"
    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Пользователь не авторизован" });
  }
};
