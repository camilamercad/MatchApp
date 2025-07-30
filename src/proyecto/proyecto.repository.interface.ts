import { Proyecto } from "./proyecto.entity.js";

export interface IProyectoRepository {
    Add(proyecto: Proyecto): Promise<void>;
    GetAll(titulo: string, descripcion: string, usuario: string, idCategoria: string, ordenarPorFecha: string): Promise<Proyecto[]>;
    GetById(id: number): Promise<Proyecto | null>;
}