const { run, get, all } = require('../config/database');

class Cart {
  static async addItem(userId, productId, quantity = 1) {
    const query = `
      INSERT OR REPLACE INTO cart (user_id, product_id, quantity, updated_at)
      VALUES (?, ?, ?, datetime('now'))
    `;
    return await run(query, [userId, productId, quantity]);
  }

  static async updateQuantity(userId, productId, quantity) {
    const query = `
      UPDATE cart 
      SET quantity = ?, updated_at = datetime('now')
      WHERE user_id = ? AND product_id = ?
    `;
    return await run(query, [quantity, userId, productId]);
  }

  static async removeItem(userId, productId) {
    const query = `DELETE FROM cart WHERE user_id = ? AND product_id = ?`;
    return await run(query, [userId, productId]);
  }

  static async getCartItems(userId) {
    const query = `
      SELECT c.*, p.name, p.price, p.image, p.description
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
    `;
    return await all(query, [userId]);
  }

  static async clearCart(userId) {
    const query = `DELETE FROM cart WHERE user_id = ?`;
    return await run(query, [userId]);
  }
}

module.exports = Cart;