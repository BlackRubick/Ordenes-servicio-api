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
    
    console.log('Adding soft delete columns to Orders table...')
    
    // Add eliminada column
    try {
      await connection.query(`ALTER TABLE Orders ADD COLUMN eliminada TINYINT(1) DEFAULT 0 NOT NULL`)
      console.log('✓ Added eliminada column')
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ eliminada column already exists')
      } else {
        throw err
      }
    }

    // Add fechaEliminacion column
    try {
      await connection.query(`ALTER TABLE Orders ADD COLUMN fechaEliminacion VARCHAR(255) NULL`)
      console.log('✓ Added fechaEliminacion column')
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ fechaEliminacion column already exists')
      } else {
        throw err
      }
    }

    // Add motivoEliminacion column
    try {
      await connection.query(`ALTER TABLE Orders ADD COLUMN motivoEliminacion LONGTEXT NULL`)
      console.log('✓ Added motivoEliminacion column')
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ motivoEliminacion column already exists')
      } else {
        throw err
      }
    }

    // Create index on eliminada column for better performance
    try {
      await connection.query(`CREATE INDEX idx_eliminada ON Orders(eliminada)`)
      console.log('✓ Created index on eliminada column')
    } catch (err) {
      if (err.code === 'ER_DUP_KEYNAME') {
        console.log('✓ Index on eliminada column already exists')
      } else {
        console.log('⚠ Could not create index:', err.message)
      }
    }

    console.log('\n✅ Migration completed successfully!')
    console.log('The Orders table now supports soft deletes.')
    await connection.end()
  } catch (err) {
    console.error('❌ Migration failed:', err.message || err)
    process.exit(1)
  }
}

migrateDatabase()
