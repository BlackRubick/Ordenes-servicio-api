require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    // Ensure uploads directory exists
    const uploadsDir = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads')
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

    await sequelize.authenticate();
    // Align DB schema with models without dropping data
    await sequelize.sync({ alter: true });
    console.log('Database connected and synced.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to start server:', err);
    process.exit(1);
  }
})();
