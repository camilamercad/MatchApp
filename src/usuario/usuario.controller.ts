import { Request, Response } from "express";
import { RequestPart, validate } from "../validator/validator.js";
import { Usuario } from "./usuario.entity.js";
import { UsuarioRepository } from "./usuario.repository.js";
import { SchemaType } from "../validator/validator.schemaFactory.js";


const usuarioRepository = new UsuarioRepository();

export class UsuarioController {
    async Add(req: Request, res: Response): Promise<any> {
        const input = validate(req, res, SchemaType.Usuario, RequestPart.body);

        const usuario = new Usuario(input.Nombre, input.Email, input.FechaDeNacimiento, input?.Descripcion, input?.Telefono, input?.Genero);

        const resultado: number = await usuarioRepository.Add(usuario);

        if(resultado === 2){
            return res.status(409).send("El nombre ya está en uso");
        }
        else if(resultado === 3){
            return res.status(409).send("El email ya está en uso");
        }
        else if(resultado === 4){
            return res.status(409).send("Error de duplicado en Nombre o Email");
        }

        return res.status(201).send();
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).Id);

        const usuario = await usuarioRepository.GetById(id);

        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }
        return res.status(200).json(usuario);
    }

    async DeleteById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).Id);
        await usuarioRepository.DeleteById(id);
        return res.status(204).send();
    }

    async UpdateById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.Id, RequestPart.params).Id);
        const input = validate(req, res, SchemaType.Usuario, RequestPart.body);

        const usuario = new Usuario(input.Nombre, input.Email, input.FechaDeNacimiento, input?.Descripcion, input?.Telefono, input?.Genero);
        
        await usuarioRepository.UpdateById(id, usuario);
        return res.status(204).send();
    }
}