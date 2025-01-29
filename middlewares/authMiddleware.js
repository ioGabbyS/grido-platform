// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ mensaje: 'Acceso denegado' });

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(400).send({ mensaje: 'Token inválido' });
  }
};

module.exports = authMiddleware;