import { Proyecto } from "./proyecto.entity.js";
import { ProyectoRepository } from "./proyecto.repository.js";
const proyectoRepository = new ProyectoRepository();
export class ProyectoController {
    async Add(req, res) {
        const input = req.body;
        if (!input.titulo) {
            throw new Error("Titulo es un campo obligatorio");
        }
        if (!input.descripcion) {
            throw new Error("Descripcion es un campo obligatorio");
        }
        const proyecto = new Proyecto(input.titulo, input.descripcion);
        await proyectoRepository.Add(proyecto);
        return res.status(201).send();
    }
}
//# sourceMappingURL=proyecto.controller.js.map