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
      listId,
    };

    db.get("tasks").push(newTask).write();

    return res.status(201).json({ message: "Tarea agregada", newTask });
  });

  server.delete("/tasks", verifyToken, (req, res) => {
    const { taskId } = req.body;
    if (!taskId) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const task = db.get("tasks").remove({ id: taskId }).write();

    return res
      .status(200)
      .json({ message: "Tarea eliminada correctamente", task });
  });

  server.put("/tasks", verifyToken, (req, res) => {
    const { taskId, newListId } = req.body;

    if (!taskId || !newListId) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const newList = db.get("lists").find({ id: newListId }).value();
    if (!newList) {
      return res.status(404).json({ message: "Nueva lista no encontrada" });
    }

    const task = db
      .get("tasks")
      .find({ id: taskId })
      .assign({ listId: newListId })
      .write();

    return res
      .status(200)
      .json({ message: "Tarea actualizada correctamente", task });
  });
};

export default taskRoutes;
