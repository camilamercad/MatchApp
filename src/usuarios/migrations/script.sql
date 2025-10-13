CREATE TABLE Usuarios (
    Id SERIAL PRIMARY KEY,
    Nombre VARCHAR(20) NOT NULL UNIQUE,
    Descripcion VARCHAR(255),
    Email VARCHAR(50) NOT NULL UNIQUE,
    Telefono INTEGER,
    FechaDeNacimiento DATE,
    Genero BOOLEAN
);