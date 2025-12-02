const db = require('../config/database');

// modelo para manejar productos
class Product {
  // obtener todos los productos
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.available = 1
        ORDER BY c.id, p.name
      `, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // obtener productos por categoria
  static async getByCategory(categoryId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM products WHERE category_id = ? AND available = 1',
        [categoryId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  // crear nuevo producto
  static async create(productData) {
    const { name, description, price, category_id, image } = productData;
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO products (name, description, price, category_id, image) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, category_id, image],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }
}

module.exports = Product;