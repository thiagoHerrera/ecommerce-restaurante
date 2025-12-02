const db = require('../config/database');

class Product {
  static async getAll() {
    const [rows] = await db.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.available = true
      ORDER BY c.id, p.name
    `);
    return rows;
  }

  static async getByCategory(categoryId) {
    const [rows] = await db.execute(
      'SELECT * FROM products WHERE category_id = ? AND available = true',
      [categoryId]
    );
    return rows;
  }

  static async create(productData) {
    const { name, description, price, category_id, image } = productData;
    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, category_id, image) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category_id, image]
    );
    return result.insertId;
  }
}

module.exports = Product;