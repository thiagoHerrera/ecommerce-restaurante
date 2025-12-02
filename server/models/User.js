const db = require('../config/database');
const bcrypt = require('bcryptjs');

// modelo para manejar usuarios
class User {
  // crear nuevo usuario
  static async create(userData) {
    const { name, email, password } = userData;
    // encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      id: db.nextUserId++,
      name,
      email,
      password: hashedPassword,
      role: 'customer'
    };
    
    db.users.push(newUser);
    return newUser.id;
  }

  // buscar usuario por email
  static async findByEmail(email) {
    return db.users.find(user => user.email === email);
  }

  // verificar si la contraseña es correcta
  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;