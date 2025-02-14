import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const SECRET_KEY = "secret_key";
export const REFRESH_KEY = "refresh_key";

export function createToken(payload, key = SECRET_KEY, expiresIn = "60m") {
  return jwt.sign(payload, key, { algorithm: "HS256", expiresIn });
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, 8);
}

export function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

export function verifyRefresh(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_KEY, (err, user) => {
      if (err) {
        reject("Invalid Refresh Token");
      } else {
        resolve(user);
      }
    });
  });
}
