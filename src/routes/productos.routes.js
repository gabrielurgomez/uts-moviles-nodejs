import { Router } from 'express'
import { crearProducto, consultarProductoPorID, generarReportePDF } from '../controllers/productos.controller.js'

const router = Router();

router.get('/productos/reportePdf', generarReportePDF)
router.get('/producto/id/:id/', consultarProductoPorID)
router.post('/producto', crearProducto)

export default router


