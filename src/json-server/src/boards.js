import { verifyToken } from "./auth.js";
import { v4 as uuidv4 } from "uuid";
const boardsRoutes = (server, router) => {
  const db = router.db;

  server.post("/boards", verifyToken, (req, res) => {
    const { title } = req.body;

    const newBoard = {
      id: uuidv4(),
      title,
      user_id: req.user.userId,
    };

    db.get("boards").push(newBoard).write();
    return res
      .status(201)
      .json({ message: "Tablero agregado con exito", newBoard });
  });

  server.get("/boards", verifyToken, (req, res) => {
    const user_id = req.user.userId;
    const userBoards = db.get("boards").filter({ user_id }).value();
    return res.status(201).json(userBoards);
  });

  server.delete("/boards", verifyToken, (req, res) => {
    const { boardId } = req.body;
    if (!boardId) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    const boards = db.get("boards").remove({ id: boardId }).write();
    const lists = db.get("lists").remove({ boardId }).write();

    return res
      .status(200)
      .json({ message: "Tablero eliminado", boards, lists });
  });
};

export default boardsRoutes;
