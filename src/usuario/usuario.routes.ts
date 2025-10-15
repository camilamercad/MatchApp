import { Router } from "express";
import { UsuarioController } from "./usuario.controller.js";

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post("/", usuarioController.Add);
usuarioRouter.get("/:Id", usuarioController.GetById);
usuarioRouter.delete("/:Id", usuarioController.DeleteById);
usuarioRouter.put("/:Id", usuarioController.UpdateById);