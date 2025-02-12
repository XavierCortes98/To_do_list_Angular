import { verifyToken } from "./auth.js";
import { v4 as uuidv4 } from "uuid";

const taskRoutes = (server, router) => {
  const db = router.db;

  server.post("/tasks", verifyToken, (req, res) => {
    const { listId, taskTitle } = req.body;
    if (!listId || !taskTitle) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const list = db.get("lists").find({ id: listId }).value();
    if (!list) {
      return res.status(404).json({ message: "Lista no encontrada" });
    }

    const newTask = {
      id: uuidv4(),
      title: taskTitle,
    };

    db.get("lists").find({ id: listId }).get("tasks").push(newTask).write();

    return res.status(201).json({ message: "Tarea agregada", newTask });
  });

  server.delete("/tasks", verifyToken, (req, res) => {
    const { listId, taskId } = req.body;
    if (!listId || !taskId) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const list = db.get("lists").find({ id: listId }).value();
    if (!list) {
      return res.status(404).json({ message: "Lista no encontrada" });
    }

    const task = db
      .get("lists")
      .find({ id: listId })
      .get("tasks")
      .remove({ id: taskId })
      .write();

    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  });
};

export default taskRoutes;
