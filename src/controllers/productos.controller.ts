import { pool } from '../db'
import { jsPDF } from "jspdf";
import { Request, Response } from 'express'

export const crearProducto = async (req: Request, res: Response) => {
    try {
        let nombre = req.body.nombre;
        let precio = req.body.precio;
        let marca = req.body.marca;
        //console.log(`Se recibio el producto de id ${id}, nombre: ${nombre} de marca ${marca}, con precio: ${precio}`)

        let sql = 'INSERT INTO `tienda`.`productos` (`nombre`, `precio`, `marca`) VALUES (?,?,?);'
        let datos = [nombre, precio, marca];

        let rta: any = await pool.query(sql, datos)
        console.log(rta[0])

        if (rta[0].affectedRows == 1) {
            return res.status(200).json({ message: 'Producto guardado con exito' })
        }
    } catch (e) {
        console.log(`ocurrio un error de mysql ${e}`)
        return res.status(500).json({ message: `Ocurrio un error de MySQL, mensaje: ${e.sqlMessage}` })
    }
}

export const consultarProductoPorID = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const sql = 'SELECT * FROM productos WHERE id = ?'
        const datos = [id]
        const rtaSql = await pool.query(sql, datos)
        let arraRta: any = rtaSql[0]
        if (arraRta.length > 0) {
            let producto = arraRta[0]
            return res.status(200).json(producto)
        } else {
            res.status(204).json()
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: `Error del servidor, ${e}` })
    }
}

export const eliminarProducto = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        let sql = 'DELETE FROM productos WHERE id = ?';
        let rtaSql = await pool.query(sql, [id])
        let rta: any = rtaSql[0];
        console.log(rta)
        if (rta.affectedRows == 1) {
            res.status(200).json({ message: 'Producto eliminado con exito' })
        } else {
            res.status(204).json()
        }
    } catch (e) {
        console.log(e)
    }

}

export const consultarProductos = async (req: Request, res: Response) => {

    console.log('Se consultarán productos...')
    try {
        let sql = 'SELECT * FROM productos'
        let rtaMySql = await pool.query(sql, [])
        let productosEncontrados: any = rtaMySql[0];

        if (productosEncontrados.length > 0) {
            console.log(productosEncontrados)
            return res.status(200).json(productosEncontrados)
        } else {
            return res.status(204).json()
        }
    } catch (e: unknown) {
        if ("sqlMessage" in e && e instanceof Error) {
            return res.status(500).json({ message: `Error en el servidor ${e.sqlMessage}` })
        }

    }

}

export const generarReportePDF = async (req: Request, res: Response) => {
    try {
        const sql = 'SELECT * FROM productos'
        const rtaSql = await pool.query(sql, [])
        let arraRta: any = rtaSql[0]
        if (arraRta.length > 0) {
            const pdf = new jsPDF();
            let y = 10
            pdf.text("REPORE PRODUCTOS CREADOS", 10, y);
            y += 30

            arraRta.forEach(p => {
                pdf.text(`${p.nombre}, Precio: ${p.precio}`, 10, y);
                y += 5
            })

            pdf.save('REPORTE PRODUCTOS.pdf');
        } else {
            res.status(204).json()
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: `Error del servidor, ${e}` })
    }
}