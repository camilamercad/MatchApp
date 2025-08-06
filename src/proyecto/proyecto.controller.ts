import { Proyecto } from "./proyecto.entity.js";
import { ProyectoRepository } from "./proyecto.repository.js";
import { Request, Response } from 'express';
import { SchemaType } from './proyecto.schemaFactory.js'
import { validate, RequestPart } from './proyecto.validations.js'

const proyectoRepository = new ProyectoRepository();

export class ProyectoController {
    async Add(req: Request, res: Response): Promise<any> {
        const input = validate(req, res, SchemaType.Add, RequestPart.body);

        const proyecto = new Proyecto(input.titulo, input.descripcion, input.usuario, input?.descripcionDetallada, undefined, input?.idCategoria, input?.imagen);

        await proyectoRepository.Add(proyecto);
        return res.status(201).send();
    }

    async GetAll(req: Request, res: Response): Promise<any> {
        const request = validate(req, res, SchemaType.GetAll, RequestPart.query);

        const proyectos = await proyectoRepository.GetAll(request?.titulo as string, request?.descripcion as string, request?.usuario as string, request?.idCategoria as string, request?.ordenarPorFecha as string);
        return res.status(200).json(proyectos);
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.GetById, RequestPart.params).id);

        const proyecto = await proyectoRepository.GetById(id);
        if (!proyecto) {
            return res.status(404).send("Proyecto no encontrado");
        }
        return res.status(200).json(proyecto);
    }
}