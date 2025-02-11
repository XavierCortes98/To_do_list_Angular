import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = "secret_key";
const expiresIn = "1h";

export function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn });
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
