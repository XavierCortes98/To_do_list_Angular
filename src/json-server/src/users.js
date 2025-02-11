import { createToken, hashPassword, comparePassword } from "./auth.js";

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

    return res.status(201).json({ message: "Usuario registrado con éxito" });
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

    const userBoards = db
      .get("boards")
      .filter((board) => board.user_id === user.id)
      .value();

    return res.status(200).json({ token, userBoards });
  });
};

export default userRoutes;
