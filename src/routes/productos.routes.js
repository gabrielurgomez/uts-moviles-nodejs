import { Router } from 'express'
import { crearProducto, consultarProductoPorID } from '../controllers/productos.controller.js'

const router = Router();

router.get('/producto/id/:id/', consultarProductoPorID)
router.post('/producto', crearProducto)

export default router


