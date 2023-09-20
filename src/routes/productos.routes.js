import { Router } from 'express'
import { crearProducto } from '../controllers/productos.controller.js'

const router = Router();

router.post('/producto', crearProducto)

export default router


