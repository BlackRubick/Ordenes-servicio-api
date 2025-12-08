const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ordenes_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);
db.Technician = require('./technician')(sequelize, Sequelize);
db.Upload = require('./upload')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Order, { foreignKey: 'userId', as: 'orders' });
db.Order.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// Technician may have orders assigned (optional)
db.Technician.hasMany(db.Order, { foreignKey: 'tecnicoId', as: 'assignedOrders' });
db.Order.belongsTo(db.Technician, { foreignKey: 'tecnicoId', as: 'tecnico' });

// Uploads linked to orders
db.Order.hasMany(db.Upload, { foreignKey: 'ordenId', as: 'uploads' });
db.Upload.belongsTo(db.Order, { foreignKey: 'ordenId', as: 'order' });

module.exports = db;
