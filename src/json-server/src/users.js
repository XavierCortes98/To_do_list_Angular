import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
const SECRET_KEY = "secret_key";

const expiresIn = "1h";

export function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn });
}

const userRoutes = (server, router) => {
  const db = router.db;

  server.post("/register", (req, res) => {
    const { email, password } = req.body;

    const existingUser = db
      .get("users")
      .find((user) => user.email === email)
      .value();

    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const id = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, 8);
    db.get("users").push({ id, email, password: hashedPassword }).write();
    return res.status(201).json({ message: "Usuario registrado con éxito" });
  });

  server.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);

    const user = db.get("users").find({ email }).value();
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = createToken({ email, userId: user.id });

    const userBoards = db
      .get("boards")
      .filter((board) => board.user_id === user.id)
      .value();

    return res.status(200).json({ token, userBoards });
  });
};

export default userRoutes;
