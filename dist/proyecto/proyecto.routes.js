import { Router } from "express";
import { ProyectoController } from "./proyecto.controller.js";
export const proyectoRouter = Router();
const proyectoController = new ProyectoController();
proyectoRouter.post("/", sanitizeProyectoInput, proyectoController.Add);
proyectoRouter.get("/", proyectoController.GetAll);
proyectoRouter.get("/:id", proyectoController.GetById);
function sanitizeProyectoInput(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new Error("Debes enviar un cuerpo en la solicitud");
    }
    Object.keys(req.body).forEach(key => {
        if (req.body[key] === undefined || req.body[key] === "" || (key !== "titulo" && key !== "descripcion" && key !== "descripcionDetallada" && key !== "usuario" && key !== "idCategoria" && key !== "imagen")) {
            delete req.body[key];
        }
        switch (key) {
            case "titulo":
                if (typeof req.body[key] !== "string") {
                    throw new Error("El campo 'titulo' debe ser de tipo string");
                }
                break;
            case "descripcion":
                if (typeof req.body[key] !== "string") {
                    throw new Error("El campo 'descripcion' debe ser de tipo string");
                }
                break;
            case "descripcionDetallada":
                if (typeof req.body[key] !== "string" && req.body[key] !== null) {
                    throw new Error("El campo 'descripcionDetallada' debe ser de tipo string");
                }
                break;
            case "usuario":
                if (typeof req.body[key] !== "string") {
                    throw new Error("El campo 'usuario' debe ser de tipo string");
                }
                break;
            case "idCategoria":
                if (typeof req.body[key] !== "number" && req.body[key] !== null) {
                    throw new Error("El campo 'idCategoria' debe ser de tipo number");
                }
                break;
            case "imagen":
                if (typeof req.body[key] !== "string" && req.body[key] !== null) {
                    throw new Error("El campo 'imagen' debe ser de tipo string");
                }
        }
    });
    next();
}
//# sourceMappingURL=proyecto.routes.js.map