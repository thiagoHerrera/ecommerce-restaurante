const { run, get } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password } = userData;
    // encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'customer')`,
      [name, email, hashedPassword]
    );
    return result.id;
  }

  static async findByEmail(email) {
    return await get(`SELECT * FROM users WHERE email = ?`, [email]);
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
