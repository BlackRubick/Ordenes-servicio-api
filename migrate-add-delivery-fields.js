require('dotenv').config()
const mysql = require('mysql2/promise')

async function migrateDatabase() {
  const host = process.env.DB_HOST || '127.0.0.1'
  const user = process.env.DB_USER || 'cesar'
  const pass = process.env.DB_PASS || 'cesar123'
  const port = process.env.DB_PORT || 3306
  const dbName = process.env.DB_NAME || 'ordenes_db'

  try {
    const connection = await mysql.createConnection({ host, user, password: pass, port, database: dbName })
    
    console.log('Adding new columns to Orders table...')
    
    // Add motivoCancelacion column
    try {
      await connection.query(`ALTER TABLE Orders ADD COLUMN motivoCancelacion LONGTEXT NULL`)
      console.log('✓ Added motivoCancelacion column')
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ motivoCancelacion column already exists')
      } else {
        throw err
      }
    }

    // Add fechaCancelacion column
    try {
      await connection.query(`ALTER TABLE Orders ADD COLUMN fechaCancelacion VARCHAR(255) NULL`)
      console.log('✓ Added fechaCancelacion column')
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ fechaCancelacion column already exists')
      } else {
        throw err
      }
    }

    // Add fechaEntrega column
    try {
      await connection.query(`ALTER TABLE Orders ADD COLUMN fechaEntrega VARCHAR(255) NULL`)
      console.log('✓ Added fechaEntrega column')
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ fechaEntrega column already exists')
      } else {
        throw err
      }
    }

    // Add quienRecibe column
    try {
      await connection.query(`ALTER TABLE Orders ADD COLUMN quienRecibe VARCHAR(255) NULL`)
      console.log('✓ Added quienRecibe column')
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ quienRecibe column already exists')
      } else {
        throw err
      }
    }

    console.log('Migration completed successfully!')
    await connection.end()
  } catch (err) {
    console.error('Migration failed:', err.message || err)
    process.exit(1)
  }
}

migrateDatabase()
