const db = require('../config/database');

// modelo para manejar productos
class Product {
  // obtener todos los productos
  static async getAll() {
    const products = db.products.filter(p => p.available);
    return products.map(p => {
      const category = db.categories.find(c => c.id === p.category_id);
      return {
        ...p,
        category_name: category ? category.name : null
      };
    });
  }

  // obtener productos por categoria
  static async getByCategory(categoryId) {
    return db.products.filter(p => p.category_id == categoryId && p.available);
  }

  // crear nuevo producto
  static async create(productData) {
    const { name, description, price, category_id, image } = productData;
    const newProduct = {
      id: db.products.length + 1,
      name,
      description,
      price,
      category_id,
      image,
      available: true
    };
    
    db.products.push(newProduct);
    return newProduct.id;
  }
}

module.exports = Product;