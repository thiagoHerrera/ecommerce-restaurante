const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middlewares/auth');

router.post('/add', authenticateToken, cartController.addItem);
router.get('/', authenticateToken, cartController.getCart);
router.put('/update', authenticateToken, cartController.updateQuantity);
router.delete('/clear', authenticateToken, cartController.clearCart);

module.exports = router;