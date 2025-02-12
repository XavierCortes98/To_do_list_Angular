import { verifyToken } from "./auth.js";
import { v4 as uuidv4 } from "uuid";

const listRoutes = (server, router) => {
  const db = router.db;

  server.get("/lists", verifyToken, (req, res) => {
    const { boardId } = req.query;

    if (!boardId) {
      return res.status(400).json({ message: "El parámetro boardId vacío" });
    }

    const lists = db.get("lists").filter({ boardId: boardId }).value();
    return res.status(200).json(lists);
  });

  server.post("/lists", verifyToken, (req, res) => {
    const { title, boardId } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const newList = {
      id: uuidv4(),
      title,
      createdDate: new Date().toISOString(),
      color: "gray",
      isArchived: false,
      boardId,
      tasks: [],
    };
    console.log("Objeto creado:", newList);
    db.get("lists").push(newList).write();

    return res.status(201).json({ message: "Tarea agregada", newList });
  });
};

export default listRoutes;
