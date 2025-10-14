import { Client } from "pg";
import { IUsuarioRepository } from "./usuarios.repository.interface";
import { Usuario } from "./usuario.entity";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'MatchApp',
    password: 'postgres',
    port: 5432,
})

export class UsuarioRepository implements IUsuarioRepository{
    constructor() {
        client.connect();
    }

    async Add(usuario: Usuario): Promise<void> {
        var result = await client.query(
        'INSERT INTO Usuarios (Nombre, Email, FechaDeNacimiento, Descripcion, Telefono, Genero) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (Nombre, Email) DO NOTHING',
        [
            usuario.Nombre,
            usuario.Email,
            usuario.FechaDeNacimiento,
            usuario.Descripcion ?? null,
            usuario.Telefono ?? null,
            usuario.Genero ?? null
        ]);

        if (result.rowCount === 0) {
            throw new Error('El nombre o el email ya están en uso.');
        }
    }

    async GetById(id: number): Promise<Usuario | null> {
        const response = await client.query('SELECT * FROM Usuarios WHERE Id = $1', [id]);

        if (response.rows.length === 0) {
            return null;
        }

        return response.rows.map(row => new Usuario(row.nombre, row.email, row.fechadenacimiento, row.descripcion, row.telefono, row.genero))[0];
    }

    async DeleteById(id: number): Promise<void> {
        await client.query('DELETE FROM Usuarios WHERE Id = $1', [id]);
    }

    async UpdateById(id: number, usuario: Usuario): Promise<void> {
        await client.query(
        'UPDATE Usuarios SET Nombre = $1, Email = $2, FechaDeNacimiento = $3, Descripcion = $4, Telefono = $5, Genero = $6 WHERE Id = $7',
        [
            usuario.Nombre,
            usuario.Email,
            usuario.FechaDeNacimiento,
            usuario.Descripcion ?? null,
            usuario.Telefono ?? null,
            usuario.Genero ?? null,
            id
        ]);
    }
}