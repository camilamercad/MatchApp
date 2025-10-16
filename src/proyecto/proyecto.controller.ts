import { Proyecto } from "./proyecto.entity.js";
import { ProyectoRepository } from "./proyecto.repository.js";
import { Request, Response } from 'express';
import { SchemaType } from '../validator/validator.schemaFactory.js'
import { validate, RequestPart } from '../validator/validator.js'

export class ProyectoController {
    private proyectoRepository: ProyectoRepository;

    constructor(proyectoRepository: ProyectoRepository) 
    {
        this.proyectoRepository = proyectoRepository;
        this.Add = this.Add.bind(this);
        this.GetAll = this.GetAll.bind(this);
        this.GetById = this.GetById.bind(this);
        this.DeleteById = this.DeleteById.bind(this);
        this.UpdateById = this.UpdateById.bind(this);
    }

    async Add(req: Request, res: Response): Promise<any> {
        const input = validate(req, res, SchemaType.ProyectoAdd, RequestPart.body);

        const proyecto = new Proyecto(input.Titulo, input.Descripcion, input.IdUsuario, input?.DescripcionDetallada, undefined, input?.IdCategoria, input?.Imagen);

        await this.proyectoRepository.Add(proyecto);
        return res.status(201).send();
    }

    async GetAll(req: Request, res: Response): Promise<any> {
        const request = validate(req, res, SchemaType.Filtros, RequestPart.query);

        const proyectos = await this.proyectoRepository.GetAll(request?.Titulo as string, request?.Descripcion as string, request?.IdUsuario as number, request?.IdCategoria as string, request?.OrdenarPorFecha as string);
        return res.status(200).json(proyectos);
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).Id);

        const proyecto = await this.proyectoRepository.GetById(id);

        if (!proyecto) {
            return res.status(404).send("Proyecto no encontrado");
        }
        return res.status(200).json(proyecto);
    }

    async DeleteById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).Id);
        await this.proyectoRepository.DeleteById(id);
        return res.status(204).send();
    }

    async UpdateById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).Id);
        const input = validate(req, res, SchemaType.ProyectoUpdate, RequestPart.body);

        const proyecto = new Proyecto(input.Titulo, input.Descripcion, undefined, input?.DescripcionDetallada, undefined, input?.IdCategoria, input?.Imagen);
        
        await this.proyectoRepository.UpdateById(id, proyecto);
        return res.status(204).send();
    }
}