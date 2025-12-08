module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    folio: { type: DataTypes.STRING, allowNull: false, unique: true },
    fechaIngreso: { type: DataTypes.STRING, allowNull: true },
    estado: { type: DataTypes.STRING, defaultValue: 'Pendiente' },
    cliente: { type: DataTypes.JSON, allowNull: true },
    equipo: { type: DataTypes.JSON, allowNull: true },
    accesorios: { type: DataTypes.JSON, allowNull: true },
    contrasena: { type: DataTypes.STRING, allowNull: true },
    descripcionFalla: { type: DataTypes.TEXT, allowNull: true },
    comentarios: { type: DataTypes.TEXT, allowNull: true },
    tecnicoUid: { type: DataTypes.STRING, allowNull: true },
    tecnicoNombre: { type: DataTypes.STRING, allowNull: true },
    firmaCliente: { type: DataTypes.TEXT('long'), allowNull: true },
    firmaTecnico: { type: DataTypes.TEXT('long'), allowNull: true },
    diagnostico: { type: DataTypes.TEXT, allowNull: true },
    trabajosRealizados: { type: DataTypes.JSON, allowNull: true },
    piezasUsadas: { type: DataTypes.JSON, allowNull: true },
    costoTotal: { type: DataTypes.DECIMAL(10,2), allowNull: true },
    fechaEstimada: { type: DataTypes.STRING, allowNull: true },
    fechaFinalizacion: { type: DataTypes.STRING, allowNull: true }
  })

  return Order
}
