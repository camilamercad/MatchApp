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
        'INSERT INTO Proyecto (Titulo, Descripcion, IdUsuario, DescripcionDetallada, IdCategoria, Imagen) VALUES ($1, $2, $3, $4, $5, $6)',
        [
            proyecto.Titulo,
            proyecto.Descripcion,
            proyecto.IdUsuario,
            proyecto.DescripcionDetallada ?? null,
            proyecto.IdCategoria ?? null,
            proyecto.Imagen ?? null
        ]);
    }

    public async GetAll(titulo: string, descripcion: string, idUsuario: number, idCategoria: string, ordenarPorFecha: string): Promise<Proyecto[]> {
        var query = 'SELECT Titulo, Descripcion, IdUsuario, FechaCreacion, IdCategoria, Imagen FROM Proyecto';
        
        if(titulo || descripcion || idUsuario || idCategoria) {
            query += ` WHERE `;
            const conditions = [];

            if (titulo) {
                conditions.push(`Titulo ILIKE '%${titulo}%'`);
            }
            if (descripcion) {
                conditions.push(`Descripcion ILIKE '%${descripcion}%'`);
            }
            if (idUsuario) {
                conditions.push(`IdUsuario = ${idUsuario}`);
            }
            if (idCategoria) {
                conditions.push(`IdCategoria = '${idCategoria}'`);
            }

            query += conditions.join(' AND ');
        }
        if (ordenarPorFecha == 'true') {
            query += ' ORDER BY FechaCreacion DESC';
        }
        if (ordenarPorFecha == 'false') {
            query += ' ORDER BY FechaCreacion ASC';
        }

        const result = await client.query(query);
        return result.rows.map(row => new Proyecto(row.titulo, row.descripcion, row.idUsuario, undefined, row.fechacreacion, row.idcategoria, row.imagen));
    }

    async GetById(id: number): Promise<Proyecto | null>{
        const response = await client.query('SELECT * FROM Proyecto WHERE Id = $1', [id]);

        if(response.rowCount === 0){
            return null;
        }

        return response.rows.map(row => new Proyecto(row.titulo, row.descripcion, row.idUsuario, row.descripciondetallada, row.fechacreacion, row.idcategoria, row.imagen))[0];
    }

    async DeleteById(id: number): Promise<void>{
        await client.query('DELETE FROM Proyecto WHERE Id = $1', [id]);
    }

    async UpdateById(id: number, proyecto: Proyecto): Promise<void>{
        await client.query('UPDATE Proyecto SET Titulo = $1, Descripcion = $2, IdUsuario = $3, DescripcionDetallada = $4, IdCategoria = $5, Imagen = $6 WHERE Id = $7', 
        [
            proyecto.Titulo,
            proyecto.Descripcion,
            proyecto.IdUsuario,
            proyecto.DescripcionDetallada ?? null,
            proyecto.IdCategoria ?? null,
            proyecto.Imagen ?? null,
            id
        ]);
    }
            
}