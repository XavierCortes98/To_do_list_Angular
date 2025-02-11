import jsonServer from "json-server";
import express from "express";
import cors from "cors";

import boardsRoutes from "./src/boards.js";
import listRoutes from "./src/boards.js";
import userRoutes from "./src/users.js";

const server = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(cors());
server.use(express.json());

userRoutes(server, router);
boardsRoutes(server, router);
listRoutes(server, router);

server.use(router);

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
