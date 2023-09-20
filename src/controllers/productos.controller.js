import { pool } from '../db.js'

export const crearProducto = async (req, res) => {
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let marca = req.body.marca;
    //console.log(`Se recibio el producto de id ${id}, nombre: ${nombre} de marca ${marca}, con precio: ${precio}`)

    let sql = 'INSERT INTO `tienda`.`productos` (`nombre`, `precio`, `marca`) VALUES (?,?,?);'
    let datos = [nombre, precio, marca];

    let rta = await pool.query(sql, datos)
    console.log(rta)


}   