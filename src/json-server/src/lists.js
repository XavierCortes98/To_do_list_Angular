import { verifyToken } from "./auth.js";
import { v4 as uuidv4 } from "uuid";

const listRoutes = (server, router) => {
  const db = router.db;

  server.get("/lists", verifyToken, (req, res) => {
    const { boardId } = req.query;

    if (!boardId) {
      return res
        .status(400)
        .json({ message: "El parámetro boardId está vacío" });
    }

    const lists = db.get("lists").filter({ boardId: boardId }).value();

    const tasks = db.get("tasks").value();

    const listsWithTasks = lists.map((list) => ({
      ...list,
      tasks: tasks.filter((task) => task.listId === list.id),
    }));

    return res.status(200).json(listsWithTasks);
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
    db.get("lists").push(newList).write();

    return res.status(201).json({ message: "Tarea agregada", newList });
  });

  server.put("/lists", verifyToken, (req, res) => {
    const { newName, listId } = req.body;

    if (!newName || !listId) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const list = db.get("lists").find({ id: listId }).value();
    if (!list) {
      return res.status(404).json({ message: "Nueva lista no encontrada" });
    }

    const task = db
      .get("lists")
      .find({ id: listId })
      .assign({ title: newName })
      .write();

    return res
      .status(200)
      .json({ message: "Tarea actualizada correctamente", task });
  });

  server.delete("/lists", verifyToken, (req, res) => {
    const { listId } = req.body;
    if (!listId) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const deletedList = db.get("lists").remove({ id: listId }).write();
    const deletedTasks = db.get("tasks").remove({ listId }).write();

    return res.status(200).json({
      message: "Lista y tareas eliminadas correctamente",
      deletedList: deletedList.map((list) => list.id),
      deletedTasks,
    });
  });
};

export default listRoutes;
