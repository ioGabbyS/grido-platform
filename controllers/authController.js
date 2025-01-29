// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  const { dni, nombre, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new User({ dni, nombre, email, password: hashedPassword, puntos: 0 });
    await nuevoUsuario.save();
    res.status(201).send({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(400).send({ mensaje: 'Error al registrar usuario', error });
  }
};

const login = async (req, res) => {
  const { dni, password } = req.body;
  try {
    const usuario = await User.findOne({ dni });
    if (usuario && await bcrypt.compare(password, usuario.password)) {
      const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' });
      res.send({ mensaje: 'Inicio de sesión exitoso', token });
    } else {
      res.status(401).send({ mensaje: 'DNI o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al iniciar sesión', error });
  }
};

module.exports = { register, login };