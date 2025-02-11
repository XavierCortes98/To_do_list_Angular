const listRoutes = (server, router) => {
  const db = router.db;

  server.get("/lists", (req, res) => {
    const { boardId } = req.query;

    if (!boardId) {
      return res.status(400).json({ message: "El parámetro boardId vacío" });
    }

    const lists = db.get("lists").filter({ boardId: boardId }).value();
    return res.status(200).json(lists);
  });
};

export default listRoutes;
