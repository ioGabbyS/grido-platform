const Product = require('../models/Product');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Canjear producto
exports.redeemProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (user.points < product.points) {
      return res.status(400).json({ message: 'Puntos insuficientes' });
    }

    user.points -= product.points;
    await user.save();
    res.json({ message: 'Canje exitoso', points: user.points });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};