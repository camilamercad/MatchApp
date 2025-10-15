import { Client } from "pg";
import { IUsuarioRepository } from "./usuario.repository.interface.js";
import { Usuario } from "./usuario.entity.js";

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

    async Add(usuario: Usuario): Promise<number> {
        try{
            await client.query(
                'INSERT INTO Usuarios (Nombre, Email, FechaDeNacimiento, Descripcion, Telefono, Genero) VALUES ($1, $2, $3, $4, $5, $6)',
                [
                    usuario.Nombre,
                    usuario.Email,
                    usuario.FechaDeNacimiento,
                    usuario.Descripcion ?? null,
                    usuario.Telefono ?? null,
                    usuario.Genero ?? null
                ]);

            return 1;
        }
        catch (error: any) {
            if (error.code === '23505') {
                if (error.constraint === 'usuarios_nombre_key') {
                    return 2;
                } else if (error.constraint === 'usuarios_email_key') {
                    return 3;
                } else {
                    return 4;
                }
            } else {
                throw error;
            }
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