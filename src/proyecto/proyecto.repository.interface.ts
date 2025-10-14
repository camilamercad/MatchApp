import { Proyecto } from "./proyecto.entity.js";

export interface IProyectoRepository {
    Add(proyecto: Proyecto): Promise<void>;
    GetAll(titulo: string, descripcion: string, idUsuario: number, idCategoria: string, ordenarPorFecha: string): Promise<Proyecto[]>;
    GetById(id: number): Promise<Proyecto | null>;
    DeleteById(id: number): Promise<void>
    UpdateById(id: number, proyecto: Proyecto): Promise<void>;
}