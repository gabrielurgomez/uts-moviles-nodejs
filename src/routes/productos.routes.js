import { Router } from 'express'
import { crearProducto, consultarProductoPorID, generarReportePDF, eliminarProducto, consultarProductos } from '../controllers/productos.controller.js'

const router = Router();

router.get('/productos', consultarProductos)
router.get('/productos/reportePdf', generarReportePDF)
router.get('/producto/id/:id/', consultarProductoPorID)
router.post('/producto', crearProducto)
router.delete('/producto/id/:id', eliminarProducto)

export default router


