import { pool } from '../db.js'
import { jsPDF } from "jspdf";

export const crearProducto = async (req, res) => {

    try {
        let nombre = req.body.nombre;
        let precio = req.body.precio;
        let marca = req.body.marca;

        //console.log(`Se recibio el producto de id ${id}, nombre: ${nombre} de marca ${marca}, con precio: ${precio}`)

        let sql = 'INSERT INTO `tienda`.`productos` (`nombre`, `precio`, `marca`) VALUES (?,?,?);'
        let datos = [nombre, precio, marca];

        let rta = await pool.query(sql, datos)
        console.log(rta[0])

        if (rta[0].affectedRows == 1) {
            return res.status(200).json({ message: 'Producto guardado con exito' })
        }
    } catch (e) {
        console.log(`ocurrio un error de mysql ${e}`)
        return res.status(500).json({ message: `Ocurrio un error de MySQL, mensaje: ${e.sqlMessage}` })
    }
}

export const consultarProductoPorID = async (req, res) => {
    try {
        const ids = req.params.id
        const sql = 'SELECT * FROM productos WHERE id = ?'
        const datos = [id]
        const rtaSql = await pool.query(sql, datos)
        let arraRta = rtaSql[0]
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


export const generarReportePDF = async (req, res) => {
    try {
        const sql = 'SELECT * FROM productos'
        const rtaSql = await pool.query(sql, [])
        let arraRta = rtaSql[0]
        if (arraRta.length > 0) {
            const pdf = new jsPDF();
            let y = 10
            pdf.text("REPORE PRODUCTOS CREADOS", 10, y);
            y += 30

            arraRta.forEach(p => {
                pdf.text(`${p.nombre}, Precio: ${p.precio}`, 10, y);
                y+=5
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