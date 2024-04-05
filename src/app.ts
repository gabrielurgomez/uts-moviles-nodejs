import express from "express";
import cors from 'cors';

//aca importamos las rutas que creamos en la carpeta routes
import productoRoutes from './routes/productos.routes';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
//app.listen(3000);
////////////////////////////////////////////////////////////////////////////////////////
//aca le decimos al servidor que rutas usar
app.use('/api', productoRoutes);

//por si se solicita un endpoint que no exista
app.use((req, res, next) => {
    console.log("peticion a ruta no encontrada, respondiendo eso...");
    res.status(404).json({ message: 'Ruta no encontrada' });
})

export default app;