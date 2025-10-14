import { Proyecto } from "./proyecto.entity.js";
import { ProyectoRepository } from "./proyecto.repository.js";
import { Request, Response } from 'express';
import { SchemaType } from '../validator/validator.schemaFactory.js'
import { validate, RequestPart } from '../validator/validator.js'

const proyectoRepository = new ProyectoRepository();

export class ProyectoController {
    async Add(req: Request, res: Response): Promise<any> {
        const input = validate(req, res, SchemaType.Proyecto, RequestPart.body);

        const proyecto = new Proyecto(input.titulo, input.descripcion, input.idUsuario, input?.descripcionDetallada, undefined, input?.idCategoria, input?.imagen);

        await proyectoRepository.Add(proyecto);
        return res.status(201).send();
    }

    async GetAll(req: Request, res: Response): Promise<any> {
        const request = validate(req, res, SchemaType.Filtros, RequestPart.query);

        const proyectos = await proyectoRepository.GetAll(request?.titulo as string, request?.descripcion as string, request?.idUsuario as number, request?.idCategoria as string, request?.ordenarPorFecha as string);
        return res.status(200).json(proyectos);
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).id);

        const proyecto = await proyectoRepository.GetById(id);

        if (!proyecto) {
            return res.status(404).send("Proyecto no encontrado");
        }
        return res.status(200).json(proyecto);
    }

    async DeleteById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).id);
        await proyectoRepository.DeleteById(id);
        return res.status(204).send();
    }

    async UpdateById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).id);
        const input = validate(req, res, SchemaType.Proyecto, RequestPart.body);

        const proyecto = new Proyecto(input.titulo, input.descripcion, input.idUsuario, input?.descripcionDetallada, undefined, input?.idCategoria, input?.imagen);
        
        await proyectoRepository.UpdateById(id, proyecto);
        return res.status(204).send();
    }
}