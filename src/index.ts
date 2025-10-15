import express from 'express';
import { proyectoRouter } from './proyecto/proyecto.routes.js';
import { usuarioRouter } from './usuario/usuario.routes.js';

const app = express();

app.use(express.json())

app.use('/api/proyectos', proyectoRouter);
app.use('/api/usuarios', usuarioRouter);

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
