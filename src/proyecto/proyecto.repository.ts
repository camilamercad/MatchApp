import { Client } from "pg";
import { IProyectoRepository } from "./proyecto.repository.interface.js";
import { Proyecto } from "./proyecto.entity.js";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'MatchApp',
    password: 'postgres',
    port: 5432,
})

export class ProyectoRepository implements IProyectoRepository{
    constructor() {
        client.connect();
    }

    public async Add(proyecto: Proyecto): Promise<void> {
        await client.query(`INSERT INTO Proyecto (Titulo, Descripcion) VALUES ('${proyecto.Titulo}', '${proyecto.Descripcion}')`);
    }
}