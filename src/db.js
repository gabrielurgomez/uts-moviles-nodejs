import { createPool } from 'mysql2/promise'

const pool = createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3307,
    database: 'tienda'
})

export { pool }
