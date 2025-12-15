const Order = require('../models/Order');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { items, total, dinersCount } = req.body;
      const userId = req.user.userId;
      
      const orderId = await Order.create({
        userId,
        items,
        total,
        dinersCount,
        status: 'pending'
      });
      
      res.status(201).json({
        message: 'Pedido creado exitosamente',
        orderId
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear pedido', error: error.message });
    }
  },

  getUserOrders: async (req, res) => {
    try {
      const userId = req.user.userId;
      const orders = await Order.findByUserId(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      await Order.updateStatus(id, status);
      res.json({ message: 'Estado del pedido actualizado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar pedido', error: error.message });
    }
  }
};

module.exports = orderController;
