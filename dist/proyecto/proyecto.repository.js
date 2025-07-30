import { Client } from "pg";
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'MatchApp',
    password: 'postgres',
    port: 5432,
});
export class ProyectoRepository {
    constructor() {
        client.connect();
    }
    async Add(proyecto) {
        await client.query(`INSERT INTO Proyecto (Titulo, Descripcion) VALUES ('${proyecto.Titulo}', '${proyecto.Descripcion}')`);
    }
}
//# sourceMappingURL=proyecto.repository.js.map