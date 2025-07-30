import { Proyecto } from "./proyecto.entity.js";

export interface IProyectoRepository {
    Add(proyecto: Proyecto): Promise<void>;
}