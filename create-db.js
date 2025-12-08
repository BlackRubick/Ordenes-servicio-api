require('dotenv').config()
const mysql = require('mysql2/promise')

async function createDatabase() {
  const host = process.env.DB_HOST || '127.0.0.1'
  const user = process.env.DB_USER || 'cesar'
  const pass = process.env.DB_PASS || 'cesar123'
  const port = process.env.DB_PORT || 3306
  const dbName = process.env.DB_NAME || 'ordenes_db'

  try {
    const connection = await mysql.createConnection({ host, user, password: pass, port })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`)
    console.log(`Database \`${dbName}\` ensured on ${host}:${port}`)
    await connection.end()
  } catch (err) {
    console.error('Failed creating database:', err.message || err)
    process.exit(1)
  }
}

createDatabase()
