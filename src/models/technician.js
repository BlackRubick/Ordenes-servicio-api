module.exports = (sequelize, DataTypes) => {
  const Technician = sequelize.define('Technician', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uid: { type: DataTypes.STRING, allowNull: false, unique: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    rol: { type: DataTypes.STRING, defaultValue: 'tecnico' },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true }
  })

  return Technician
}
