import { Router } from "express";
import { ProyectoController } from "./proyecto.controller.js";

export const proyectoRouter = Router();
const proyectoController = new ProyectoController();

proyectoRouter.post("/", sanitizeProyectoInput, proyectoController.Add);

function sanitizeProyectoInput(req: any, res: any, next: any){
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new Error("Debes enviar un cuerpo en la solicitud");
    }

    Object.keys(req.body).forEach(key => {
        if (req.body[key] === undefined || req.body[key] === null || req.body[key] === "" || (key !== "titulo" && key !== "descripcion")) {
            delete req.body[key];
        }
    });

    next();
}