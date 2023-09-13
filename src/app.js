import express from "express";
//import trabajadoresRoutes from './routes/trabajadores.routes.js';
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
//app.listen(3000);
////////////////////////////////////////////////////////////////////////////////////////
//app.use('/api', trabajadoresRoutes);

//por si se solicita un endpoint que no exista
app.use((req, res, next) => {
    console.log("peticion a ruta no encontrada, respondiendo eso...");
    res.status(404).json({ message: 'Ruta no encontrada' });
})

export default app;