module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define('Upload', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ordenId: { type: DataTypes.INTEGER, allowNull: true },
    filename: { type: DataTypes.STRING, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false }
  })

  return Upload
}
