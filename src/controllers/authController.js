const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Technician } = require('../models');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: 'Missing fields' });

    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    // Try system users first
    const user = await User.findOne({ where: { email } });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });

      const payload = { id: user.id, email: user.email, role: user.role, source: 'user' };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

      return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, rol: user.role, uid: user.uid } });
    }

    // If not found, try technicians
    const tech = await Technician.findOne({ where: { email } });
    if (!tech) return res.status(401).json({ message: 'Invalid credentials' });
    if (tech.activo === false) return res.status(401).json({ message: 'Technician inactive' });
    if (!tech.password) return res.status(401).json({ message: 'Invalid credentials' });

    const matchTech = await bcrypt.compare(password, tech.password);
    if (!matchTech) return res.status(401).json({ message: 'Invalid credentials' });

    const techRole = tech.rol || 'tecnico';
    const payload = { id: tech.id, email: tech.email, role: techRole, uid: tech.uid, source: 'technician' };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    return res.json({ token, user: { id: tech.id, uid: tech.uid, name: tech.nombre, email: tech.email, role: techRole, rol: techRole } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
