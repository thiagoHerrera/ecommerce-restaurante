const express = require('express');
const router = express.Router();

// POST /api/orders - Crear nueva orden
router.post('/', async (req, res) => {
  try {
    res.json({ message: 'Crear orden' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;