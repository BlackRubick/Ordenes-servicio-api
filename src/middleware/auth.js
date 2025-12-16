const jwt = require('jsonwebtoken');
const { User, Technician } = require('../models');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Token error' });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Token mal formado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Tokens issued for technicians
    if (decoded.source === 'technician') {
      const tech = await Technician.findByPk(decoded.id);
      if (!tech || tech.activo === false) return res.status(401).json({ message: 'User not found' });
      req.user = { id: tech.id, email: tech.email, role: tech.rol || 'tecnico', uid: tech.uid };
      return next();
    }

    // Default: system users
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = { id: user.id, email: user.email, role: user.role };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
