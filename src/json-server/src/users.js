import {
  createToken,
  hashPassword,
  comparePassword,
  verifyRefresh,
  REFRESH_KEY,
} from "./auth.js";
import { v4 as uuidv4 } from "uuid";
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
    const hashedPassword = hashPassword(password);
    db.get("users").push({ id, email, password: hashedPassword }).write();

    const token = createToken({ email, userId: id });

    return res
      .status(201)
      .json({ message: "Usuario registrado con éxito", token });
  });

  server.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = db.get("users").find({ email }).value();
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    if (!comparePassword(password, user.password)) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = createToken({ email, userId: user.id });
    const refreshToken = createToken({ userId: user.id }, REFRESH_KEY, "7d");
    const userBoards = db
      .get("boards")
      .filter((board) => board.user_id === user.id)
      .value();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ token, userBoards });
  });

  server.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token requerido" });
    }

    try {
      const user = await verifyRefresh(refreshToken);

      const token = createToken({ userId: user.userId });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(403).json({ message: "Token inválido" });
    }
  });
};

export default userRoutes;
