const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { items, dinersCount, totalPrice, customerInfo } = req.body;

    const orderId = await Order.create({
      items,
      dinersCount,
      totalPrice,
      customerInfo,
      status: 'pendiente'
    });

    const order = await Order.findById(orderId);
    res.json({ success: true, order, message: 'Pedido creado exitosamente' });
  } catch (error) {
    console.error('Error creando pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error listando pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
});

module.exports = router;
