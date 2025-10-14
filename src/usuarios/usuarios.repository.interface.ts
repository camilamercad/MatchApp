import { Usuario } from "./usuario.entity";

export interface IUsuarioRepository {
    Add(usuario: Usuario): Promise<void>;
    GetById(id: number): Promise<Usuario | null>;
    DeleteById(id: number): Promise<void>
    UpdateById(id: number, usuario: Usuario): Promise<void>;
}