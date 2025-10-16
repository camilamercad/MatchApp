import { Router } from "express";
import { ProyectoController } from "./proyecto.controller.js";
import { ProyectoRepository } from "./proyecto.repository.js";


export const proyectoRouter = Router();
const proyectoRepository = new ProyectoRepository();

const proyectoController = new ProyectoController(proyectoRepository);

proyectoRouter.post("/", proyectoController.Add);
proyectoRouter.get("/", proyectoController.GetAll);
proyectoRouter.get("/:Id", proyectoController.GetById);
proyectoRouter.delete("/:Id", proyectoController.DeleteById);
proyectoRouter.put("/:Id", proyectoController.UpdateById);