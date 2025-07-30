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
        await client.query(
        'INSERT INTO Proyecto (Titulo, Descripcion, Usuario, DescripcionDetallada, IdCategoria) VALUES ($1, $2, $3, $4, $5)',
        [
            proyecto.Titulo,
            proyecto.Descripcion,
            proyecto.Usuario,
            proyecto.DescripcionDetallada ?? null,
            proyecto.IdCategoria ?? null
        ]);
    }

    public async GetAll(titulo: string, descripcion: string, usuario: string, idCategoria: string): Promise<Proyecto[]> {
        var query = 'SELECT Titulo, Descripcion, Usuario, IdCategoria FROM Proyecto';

        if(titulo || descripcion || usuario || idCategoria){
            query += ` WHERE `;
            const conditions = [];

            if (titulo) {
                conditions.push(`Titulo ILIKE '%${titulo}%`);
            }
            if (descripcion) {
                conditions.push(`Descripcion ILIKE '%${descripcion}%'`);
            }
            if (usuario) {
                conditions.push(`Usuario = '${usuario}'`);
            }
            if (idCategoria) {
                conditions.push(`IdCategoria = ${idCategoria}`);
            }

            query += conditions.join(' AND ');
        }

        const result = await client.query(query);
        return result.rows.map(row => new Proyecto(row.titulo, row.descripcion, row.usuario, undefined, undefined, row.idcategoria));
    }

    async GetById(id: number): Promise<Proyecto | null>{
        const response = await client.query('SELECT * FROM Proyecto WHERE Id = $1, [id]')

        if(response.rowCount === 0){
            return null;
        }

        return response.rows.map(row => new Proyecto(row.titulo, row.descripcion, row.usuario, row.descripciondetallada, row.fechacreacion, row.idcategoria))[0];
    }
}