import { Proyecto } from "./proyecto.entity.js";
import { ProyectoRepository } from "./proyecto.repository.js";
import { Request, Response } from 'express';

const proyectoRepository = new ProyectoRepository();

export class ProyectoController {
    async Add(req: Request, res: Response): Promise<any> {
        const input = req.body;

        if (!input.titulo) {
            throw new Error("Titulo es un campo obligatorio");
        }
        if (!input.descripcion) {
            throw new Error("Descripcion es un campo obligatorio");
        }
        if (!input.usuario) {
            throw new Error("Usuario es un campo obligatorio");
        }

        const proyecto = new Proyecto(input.titulo, input.descripcion, input.usuario, input?.descripcionDetallada, undefined, input?.idCategoria, input?.imagen);

        await proyectoRepository.Add(proyecto);
        return res.status(201).send();
    }

    async GetAll(req: Request, res: Response): Promise<any> {
        for(const key of Object.keys(req.query)) {
            if(key !== "titulo" && key !== "descripcion" && key !== "usuario" && key !== "idCategoria" && key !== "ordenarPorFecha") {
                throw new Error(`El campo '${key}' no es válido para la búsqueda`);
            }
        }

        const { titulo, descripcion, usuario, idCategoria, ordenarPorFecha} = req.query;
        const proyectos = await proyectoRepository.GetAll(titulo as string, descripcion as string, usuario as string, idCategoria as string, ordenarPorFecha as string);
        return res.status(200).json(proyectos);
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new Error("El ID debe ser un número");
        }

        const proyecto = await proyectoRepository.GetById(id);
        if (!proyecto) {
            return res.status(404).send("Proyecto no encontrado");
        }
        return res.status(200).json(proyecto);
    }
}

function foreach() {
    throw new Error("Function not implemented.");
}
