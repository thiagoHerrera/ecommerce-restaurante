const express = require('express');
const router = express.Router();

// almacen temporal de pedidos
let orders = [];
let orderIdCounter = 1;

// POST /api/orders - Crear nueva orden
router.post('/', async (req, res) => {
  try {
    const { items, dinersCount, totalPrice, customerInfo } = req.body;
    
    // crear nuevo pedido
    const newOrder = {
      id: orderIdCounter++,
      items: items,
      dinersCount: dinersCount,
      totalPrice: totalPrice,
      customerInfo: customerInfo || {},
      status: 'pendiente',
      createdAt: new Date().toISOString(),
      orderNumber: `WF${Date.now()}`
    };
    
    orders.push(newOrder);
    console.log('Nuevo pedido creado:', newOrder.orderNumber);
    
    res.json({ 
      success: true, 
      order: newOrder,
      message: 'Pedido creado exitosamente' 
    });
  } catch (error) {
    console.error('Error creando pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

// GET /api/orders - Obtener todos los pedidos
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;