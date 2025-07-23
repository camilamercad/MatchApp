import express from 'express';
import { proyectoRouter } from './proyecto/proyecto.routes.js';
const app = express();
app.use(express.json());
app.use('/api/proyectos', proyectoRouter);
app.listen(3000, () => {
    console.log('Server runnning on http://localhost:3000/');
});
//# sourceMappingURL=index.js.map