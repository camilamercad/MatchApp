import { Router } from "express";
import { ProyectoController } from "./proyecto.controller.js";


export const proyectoRouter = Router();
const proyectoController = new ProyectoController();

proyectoRouter.post("/", proyectoController.Add);
proyectoRouter.get("/", proyectoController.GetAll);
proyectoRouter.get("/:id", proyectoController.GetById);