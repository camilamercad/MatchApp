import Joi from "joi";

export class SchemaFactory {
  static getSchema(type: SchemaType): Joi.ObjectSchema<any> {
    switch (type) {
      case SchemaType.Add:
        return Joi.object({
          titulo: Joi.string().min(1).max(50).required(),
          descripcion: Joi.string().min(1).max(255).required(),
          usuario: Joi.string().min(1).max(50).required(),
          descripcionDetallada: Joi.string().max(500).optional(),
          idCategoria: Joi.number().integer().min(1).optional(),
          imagen: Joi.string().uri().optional()
        });

      case SchemaType.GetAll:
        return Joi.object({
          titulo: Joi.string().optional(),
          descripcion: Joi.string().optional(),
          usuario: Joi.string().optional(),
          idCategoria: Joi.string().pattern(/^[1-9]\d*$/).optional(),
          ordenarPorFecha: Joi.string().valid("true", "false").optional()
        }).unknown(false);

      case SchemaType.GetById:
        return Joi.object({
          id: Joi.number().integer().min(1).required()
        }).unknown(false);

      default:
        throw new Error(`Schema not found for type: ${type}`);
    }
  }
}

export enum SchemaType {
    Add = "add",
    GetAll = "getAll",
    GetById = "getById"
}  