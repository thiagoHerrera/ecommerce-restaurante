const { run, all, get } = require('../config/database');

class Order {
  static async create(orderData) {
    const { userId = null, items, totalPrice, dinersCount, status, customerInfo } = orderData;
    const result = await run(
      `INSERT INTO orders (user_id, items, total_price, diners_count, customer_info, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        JSON.stringify(items || []),
        totalPrice,
        dinersCount || null,
        customerInfo ? JSON.stringify(customerInfo) : null,
        status || 'pending'
      ]
    );
    return result.id;
  }

  static async findByUserId(userId) {
    const rows = await all(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY datetime(created_at) DESC`,
      [userId]
    );
    return rows.map(r => ({ ...r, items: JSON.parse(r.items || '[]'), customer_info: r.customer_info ? JSON.parse(r.customer_info) : null }));
  }

  static async findAll() {
    const rows = await all(
      `SELECT o.*, u.name as user_name, u.email as user_email
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       ORDER BY datetime(o.created_at) DESC`
    );
    return rows.map(r => ({ ...r, items: JSON.parse(r.items || '[]'), customer_info: r.customer_info ? JSON.parse(r.customer_info) : null }));
  }

  static async updateStatus(orderId, status) {
    await run(
      `UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?`,
      [status, orderId]
    );
  }

  static async findById(orderId) {
    const row = await get(
      `SELECT o.*, u.name as user_name, u.email as user_email
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [orderId]
    );
    if (!row) return null;
    return { ...row, items: JSON.parse(row.items || '[]'), customer_info: row.customer_info ? JSON.parse(row.customer_info) : null };
  }
}

module.exports = Order;
