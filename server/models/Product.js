const { all, run, get } = require('../config/database');

class Product {
  static async getAll() {
    const rows = await all(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.available = 1
      ORDER BY p.id ASC
    `);
    return rows;
  }

  static async getByCategory(categoryId) {
    const rows = await all(
      `SELECT * FROM products WHERE category_id = ? AND available = 1 ORDER BY id ASC`,
      [categoryId]
    );
    return rows;
  }

  static async create(productData) {
    const { name, description, price, category_id, image } = productData;
    const result = await run(
      `INSERT INTO products (name, description, price, category_id, image, available) VALUES (?, ?, ?, ?, ?, 1)`,
      [name, description, price, category_id, image]
    );
    return result.id;
  }
}

module.exports = Product;
