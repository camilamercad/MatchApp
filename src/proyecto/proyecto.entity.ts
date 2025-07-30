export class Proyecto{
    constructor(
        public Titulo: string,
        public Descripcion: string,
        public Usuario: string,
        public DescripcionDetallada?: string,
        public FechaCreacion?: Date,
        public IdCategoria?: number
    ) {}
}