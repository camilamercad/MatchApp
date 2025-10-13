-- Active: 1753224570750@@127.0.0.1@5432@MatchApp
CREATE TABLE IF NOT EXISTS Proyecto (
    Id SERIAL PRIMARY KEY,
    Titulo VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(255) NULL,
    DescripcionDetallada VARCHAR(500) NULL,
    IdUsuario INT REFERENCES Usuarios(Id) NOT NULL,
    IdCategoria INT REFERENCES Categorias(Id),
    FechaCreacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    Imagen VARCHAR(255) NULL
);