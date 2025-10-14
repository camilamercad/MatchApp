import Joi from "joi";

export class SchemaFactory {
  static getSchema(type: SchemaType): Joi.ObjectSchema<any> {
    switch (type) {
      case SchemaType.Proyecto:
        return Joi.object({
          titulo: Joi.string().min(1).max(50).required(),
          descripcion: Joi.string().min(1).max(255).required(),
          idUsuario: Joi.number().integer().min(1).required(),
          descripcionDetallada: Joi.string().max(500).optional(),
          idCategoria: Joi.number().integer().min(1).optional(),
          imagen: Joi.string().uri().optional()
        });

        case SchemaType.Usuario:
          return Joi.object({
            nombre: Joi.string().min(1).max(20).required(),
            email: Joi.string().email().max(50).required(),
            fechaDeNacimiento: Joi.date().less('now').required(),
            descripcion: Joi.string().max(255).optional(),
            telefono: Joi.number().integer().min(1000000).max(9999999999).optional(),
            genero: Joi.boolean().optional()
          });

      case SchemaType.Filtros:
        return Joi.object({
          titulo: Joi.string().optional(),
          descripcion: Joi.string().optional(),
          idUsuario: Joi.number().integer().min(1).optional(),
          idCategoria: Joi.string().pattern(/^[1-9]\d*$/).optional(),
          ordenarPorFecha: Joi.string().valid("true", "false").optional()
        }).unknown(false);

      case SchemaType.Id:
        return Joi.object({
          id: Joi.number().integer().min(1).required()
        }).unknown(false);

      default:
        throw new Error(`Schema not found for type: ${type}`);
    }
  }
}

export enum SchemaType {
    Proyecto = "proyecto",
    Usuario = "usuario",
    Filtros = "filtros",
    Id = "id",
}  