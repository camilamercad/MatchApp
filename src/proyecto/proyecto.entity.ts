export class Proyecto{
    constructor(
        public Titulo: string,
        public Descripcion: string,
        public IdUsuario: number,
        public DescripcionDetallada?: string,
        public FechaCreacion?: Date,
        public IdCategoria?: number,
        public Imagen?: string
    ) {}
}