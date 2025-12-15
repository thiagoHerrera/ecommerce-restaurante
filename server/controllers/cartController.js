const Cart = require('../models/Cart');

const cartController = {
  // Agregar item al carrito
  addItem: async (req, res) => {
    try {
      const { productId, quantity = 1 } = req.body;
      const userId = req.user.userId;
      
      await Cart.addItem(userId, productId, quantity);
      res.json({ message: 'Producto agregado al carrito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar al carrito', error: error.message });
    }
  },

  // Obtener carrito del usuario
  getCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const items = await Cart.getCartItems(userId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener carrito', error: error.message });
    }
  },

  // Actualizar cantidad
  updateQuantity: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.userId;
      
      if (quantity <= 0) {
        await Cart.removeItem(userId, productId);
      } else {
        await Cart.updateQuantity(userId, productId, quantity);
      }
      
      res.json({ message: 'Carrito actualizado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar carrito', error: error.message });
    }
  },

  // Limpiar carrito
  clearCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      await Cart.clearCart(userId);
      res.json({ message: 'Carrito limpiado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al limpiar carrito', error: error.message });
    }
  }
};

module.exports = cartController;