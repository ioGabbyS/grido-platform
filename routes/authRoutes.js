// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/registro', register);
router.post('/login', login);

// Ruta protegida
router.get('/perfil', authMiddleware, (req, res) => {
  res.send({ mensaje: 'Acceso a perfil autorizado', userId: req.userId });
});

module.exports = router;