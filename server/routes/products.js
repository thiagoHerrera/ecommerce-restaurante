const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// obtener todos los productos del menu
router.get('/', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    console.log('Error obteniendo productos:', error);
    res.status(500).json({ error: error.message });
  }
});

// obtener productos por categoria
router.get('/category/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const products = await Product.getByCategory(categoryId);
    res.json(products);
  } catch (error) {
    console.log('Error obteniendo productos por categoria:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;