const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/grido', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelos de la base de datos
const UserSchema = new mongoose.Schema({
  dni: { type: String, unique: true, required: true },
  nombre: String,
  email: String,
  password: String,
  puntos: { type: Number, default: 0 },
});

const RewardSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  puntosRequeridos: Number,
});

const User = mongoose.model('User', UserSchema);
const Reward = mongoose.model('Reward', RewardSchema);

// Rutas de la API

// Registrar usuario
app.post('/registro', async (req, res) => {
  const { dni, nombre, email, password } = req.body;
  try {
    const nuevoUsuario = new User({ dni, nombre, email, password, puntos: 0 });
    await nuevoUsuario.save();
    res.status(201).send({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(400).send({ mensaje: 'Error al registrar usuario', error });
  }
});

// Iniciar sesión
app.post('/login', async (req, res) => {
  const { dni, password } = req.body;
  try {
    const usuario = await User.findOne({ dni, password });
    if (usuario) {
      res.send({ mensaje: 'Inicio de sesión exitoso', usuario });
    } else {
      res.status(401).send({ mensaje: 'DNI o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al iniciar sesión', error });
  }
});

// Obtener recompensas
app.get('/recompensas', async (req, res) => {
  try {
    const recompensas = await Reward.find();
    res.send(recompensas);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener recompensas', error });
  }
});

// Canjear recompensa
app.post('/canjear', async (req, res) => {
  const { usuarioId, recompensaId } = req.body;
  try {
    const usuario = await User.findById(usuarioId);
    const recompensa = await Reward.findById(recompensaId);

    if (usuario.puntos >= recompensa.puntosRequeridos) {
      usuario.puntos -= recompensa.puntosRequeridos;
      await usuario.save();
      res.send({ mensaje: 'Recompensa canjeada correctamente', usuario });
    } else {
      res.status(400).send({ mensaje: 'Puntos insuficientes' });
    }
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al canjear recompensa', error });
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});