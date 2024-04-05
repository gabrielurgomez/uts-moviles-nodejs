import { createPool } from 'mysql2/promise'
import { config } from 'dotenv'
config();
const pool = createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: process.env.DB_NAME,
})

export { pool }
