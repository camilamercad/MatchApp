CREATE TABLE Usuarios (
    Id SERIAL PRIMARY KEY,
    Nombre VARCHAR(20) NOT NULL UNIQUE,
    Email VARCHAR(50) NOT NULL UNIQUE,
    FechaDeNacimiento DATE NOT NULL,
    Descripcion VARCHAR(255) NULL,
    Telefono BIGINT NULL,
    Genero BOOLEAN NULL
);