const Product = require('../models/Product');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener producto', error: error.message });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const products = await Product.findByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos por categoría', error: error.message });
    }
  }
};

module.exports = productController;
