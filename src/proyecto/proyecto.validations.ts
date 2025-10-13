import Joi from "joi";
import { SchemaType, SchemaFactory } from './proyecto.schemaFactory.js'

export function validate(req: any, res: any, schema: SchemaType, tipo: RequestPart){
    const {error, value} = SchemaFactory.getSchema(schema).validate(req[RequestPart[tipo]], { abortEarly: false });
    if(error){
        return res.status(400).send('Los siguientes campos son inválidos: ' + error.details.map((detail: any) => detail.path).join(', '));
    }

    return value;
}

export enum RequestPart {
    body,
    query,
    params
}


