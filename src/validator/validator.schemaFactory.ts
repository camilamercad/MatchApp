import Joi from "joi";

export class SchemaFactory {
  static getSchema(type: SchemaType): Joi.ObjectSchema<any> {
    switch (type) {
      case SchemaType.ProyectoAdd:
        return Joi.object({
          Titulo: Joi.string().min(1).max(50).required(),
          Descripcion: Joi.string().min(1).max(255).required(),
          IdUsuario: Joi.number().integer().min(1).required(),
          DescripcionDetallada: Joi.string().max(500).optional(),
          IdCategoria: Joi.number().integer().min(1).optional(),
          Imagen: Joi.string().uri().optional()
        });

      case SchemaType.ProyectoUpdate:
        return Joi.object({
          Titulo: Joi.string().min(1).max(50).required(),
          Descripcion: Joi.string().min(1).max(255).required(),
          DescripcionDetallada: Joi.string().max(500).optional(),
          IdCategoria: Joi.number().integer().min(1).optional(),
          Imagen: Joi.string().uri().optional()
        });

        case SchemaType.Usuario:
          return Joi.object({
            Nombre: Joi.string().min(1).max(20).required(),
            Email: Joi.string().email().max(50).required(),
            FechaDeNacimiento: Joi.date().less('now').required(),
            Descripcion: Joi.string().max(255).optional(),
            Telefono: Joi.number().integer().min(1000000).max(9999999999).optional(),
            Genero: Joi.boolean().optional()
          });

      case SchemaType.Filtros:
        return Joi.object({
          Titulo: Joi.string().optional(),
          Descripcion: Joi.string().optional(),
          IdUsuario: Joi.number().integer().min(1).optional(),
          IdCategoria: Joi.string().pattern(/^[1-9]\d*$/).optional(),
          OrdenarPorFecha: Joi.string().valid("true", "false").optional()
        }).unknown(false);

      case SchemaType.Id:
        return Joi.object({
          Id: Joi.number().integer().min(1).required()
        }).unknown(false);

      default:
        throw new Error(`Schema not found for type: ${type}`);
    }
  }
}

export enum SchemaType {
    ProyectoAdd = "proyectoAdd",
    ProyectoUpdate = "proyectoUpdate",
    Usuario = "usuario",
    Filtros = "filtros",
    Id = "id",
}  