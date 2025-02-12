import { verifyToken } from "./auth.js";
import { v4 as uuidv4 } from "uuid";
const boardsRoutes = (server, router) => {
  const db = router.db;

  server.post("/new-board", verifyToken, (req, res) => {
    const { title } = req.body;
    console.log(title);
    const user_id = req.user.userId;
    const id = uuidv4();
    db.get("boards").push({ id, title, user_id }).write();

    return res.status(201).json({ message: "Usuario registrado con éxito" });
  });

  server.get("/boards", verifyToken, (req, res) => {
    const user_id = req.user.userId;
    const userBoards = db.get("boards").filter({ user_id }).value();
    console.log(req.user);

    return res.status(201).json(userBoards);
  });
};

export default boardsRoutes;
