import { Client } from "pg";
import { ProyectoRepository } from "../../../proyecto.repository";
import { it, jest, beforeEach, describe, expect, beforeAll, afterAll } from '@jest/globals';
import { GenericContainer, StartedTestContainer } from 'testcontainers';

describe("ProyectoRepository Integration", () => {
    jest.setTimeout(60000);

    let postgresContainer: StartedTestContainer;
    let client: Client;
    let repository: ProyectoRepository;

    beforeAll(async () => {
        postgresContainer = await new GenericContainer("postgres")
            .withExposedPorts(5432)
            .withEnvironment({ ENV: "VALUE", POSTGRES_USER: "test", POSTGRES_PASSWORD: "test", POSTGRES_DB: "test" })
            .start();
        
        const connectionString = `postgres://test:test@${postgresContainer.getHost()}:${postgresContainer.getMappedPort(5432)}/test`;
        client = new Client({ connectionString });
        await client.connect();

        await client.query(`
            CREATE TABLE IF NOT EXISTS categorias (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(50),
            descripcion VARCHAR(100)
            );

            CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(20) NOT NULL UNIQUE,
            email VARCHAR(50) NOT NULL UNIQUE,
            fechadenacimiento DATE NOT NULL,
            descripcion VARCHAR(255),
            telefono BIGINT,
            genero BOOLEAN
            );
        `);

        await client.query(`
            INSERT INTO categorias (id, nombre, descripcion)
            VALUES (1, 'General', 'Categoría por defecto')
            ON CONFLICT (id) DO NOTHING;

            INSERT INTO usuarios (id, nombre, email, fechadenacimiento)
            VALUES (1, 'tester', 'tester@example.com', '2000-01-01')
            ON CONFLICT (id) DO NOTHING;
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS proyecto (
            id SERIAL PRIMARY KEY,
            titulo VARCHAR(50) NOT NULL,
            descripcion VARCHAR(255),
            descripciondetallada VARCHAR(500),
            idusuario INT NOT NULL REFERENCES usuarios(id),
            idcategoria INT REFERENCES categorias(id),
            fechacreacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            imagen VARCHAR(255)
            );
        `);
        
        repository = new ProyectoRepository(client);
    });

    afterAll(async () => {
    try { await client?.query('DROP TABLE IF EXISTS proyecto'); } catch {}
    try { await client?.query('DROP TABLE IF EXISTS usuarios'); } catch {}
    try { await client?.query('DROP TABLE IF EXISTS categorias'); } catch {}
    await client?.end().catch(() => {});
    await postgresContainer?.stop().catch(() => {});
    });

    it("should create and return multiple projects", async () => {
        const project1 = { Titulo: "Project 1", Descripcion: "Description 1", IdUsuario: 1, IdCategoria: 1 };
        const project2 = { Titulo: "Project 2", Descripcion: "Description 2", IdUsuario: 1, IdCategoria: 1 };

        await repository.Add(project1);
        await repository.Add(project2);

        const projects = await repository.GetAll(undefined, undefined, undefined, undefined, undefined);
        expect(projects).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ Titulo: "Project 1", Descripcion: "Description 1", IdUsuario: 1, IdCategoria: 1 }),
                expect.objectContaining({ Titulo: "Project 2", Descripcion: "Description 2", IdUsuario: 1, IdCategoria: 1 })
            ])
        );
    });
});
