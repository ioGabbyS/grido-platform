const express = require('express');
const { getProducts, redeemProduct } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.post('/:id/redeem', protect, redeemProduct);

module.exports = router;