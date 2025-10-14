import { Request, Response } from "express";
import { RequestPart, validate } from "../validator/validator";
import { Usuario } from "./usuario.entity";
import { UsuarioRepository } from "./usuarios.repository";
import { SchemaType } from "../validator/validator.schemaFactory";


const usuarioRepository = new UsuarioRepository();

export class UsuarioController {
    async Add(req: Request, res: Response): Promise<any> {
        const input = validate(req, res, SchemaType.Usuario, RequestPart.body);
        
        const usuario = new Usuario(input.nombre, input.email, input.fechaDeNacimiento, input?.descripcion, input?.telefono, input?.genero);

        await usuarioRepository.Add(usuario);
        return res.status(201).send();
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).id);

        const usuario = await usuarioRepository.GetById(id);

        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }
        return res.status(200).json(usuario);
    }

    async DeleteById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).id);
        await usuarioRepository.DeleteById(id);
        return res.status(204).send();
    }

    async UpdateById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).id);
        const input = validate(req, res, SchemaType.Usuario, RequestPart.body);

        const usuario = new Usuario(input.nombre, input.email, input.fechaDeNacimiento, input?.descripcion, input?.telefono, input?.genero);
        
        await usuarioRepository.UpdateById(id, usuario);
        return res.status(204).send();
    }
}