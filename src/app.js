const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');
const productsRoutes = require('./routes/products');
const tecnicosRoutes = require('./routes/tecnicos');
const usersRoutes = require('./routes/users');
const uploadsRoutes = require('./routes/uploads');
const wcRoutes = require('./routes/wc');
const publicRoutes = require('./routes/public');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ message: 'Ordenes-Servicio API' }));

app.use('/api/auth', authRoutes);
app.use('/api/ordenes', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/tecnicos', tecnicosRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/wc', wcRoutes);
app.use('/api/public', publicRoutes);

module.exports = app;
