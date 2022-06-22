import jwt from "jsonwebtoken";
import config from "config";

export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  } //исключаем метод OPTIONS
  try {
    // const token = req.headers["authorization"];
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const decodedToken = jwt.verify(token, config.get("jwtSecret")); // проводим аутентификацию
    // decodedToken {userId: string, iat: num, exp: num}
    // добавляем поле req.user т.к до этого оно undefined и назначаем ему значение decodedToken
    req.user = decodedToken;
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ message: "Время использования токена вышло" });
  }
};
