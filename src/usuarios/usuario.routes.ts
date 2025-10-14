import { Router } from "express";
import { UsuarioController } from "./usuarios.controller";

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post("/", usuarioController.Add);
usuarioRouter.get("/:id", usuarioController.GetById);
usuarioRouter.delete("/:id", usuarioController.DeleteById);
usuarioRouter.put("/:id", usuarioController.UpdateById);