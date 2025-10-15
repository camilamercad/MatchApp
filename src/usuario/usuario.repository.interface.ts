import { Usuario } from "./usuario.entity.js";

export interface IUsuarioRepository {
    Add(usuario: Usuario): Promise<number>;
    GetById(id: number): Promise<Usuario | null>;
    DeleteById(id: number): Promise<void>
    UpdateById(id: number, usuario: Usuario): Promise<void>;
}