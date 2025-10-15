export class Usuario{
    constructor(
        public Nombre: string,
        public Email: string,
        public FechaDeNacimiento: Date,
        public Descripcion?: string,
        public Telefono?: number,
        public Genero?: boolean
    ) {}
}