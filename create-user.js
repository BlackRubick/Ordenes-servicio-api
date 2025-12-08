require('dotenv').config()
const bcrypt = require('bcryptjs')
const { sequelize, User } = require('./src/models')

async function main() {
  const args = process.argv.slice(2)
  const getArg = (flag) => {
    const idx = args.indexOf(flag)
    if (idx !== -1 && args[idx + 1]) return args[idx + 1]
    return null
  }

  const email = getArg('--email') || process.env.SEED_EMAIL || 'blackrubick14@gmail.com'
  const password = getArg('--password') || process.env.SEED_PASSWORD || 'Cuco2024**'
  const name = getArg('--name') || process.env.SEED_NAME || 'Admin'
  const role = getArg('--role') || process.env.SEED_ROLE || 'admin'

  if (!email || !password) {
    console.error('Email y password son requeridos')
    process.exit(1)
  }

  try {
    await sequelize.authenticate()
    await sequelize.sync()

    const existing = await User.findOne({ where: { email } })
    if (existing) {
      console.log(`Usuario ya existe: ${email} (id=${existing.id})`)
      process.exit(0)
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role })
    console.log(`Usuario creado: ${user.email} (id=${user.id}, role=${user.role})`)
    process.exit(0)
  } catch (err) {
    console.error('Error creando usuario:', err)
    process.exit(1)
  }
}

main()
