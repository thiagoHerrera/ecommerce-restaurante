const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = process.env.DB_FILE || path.resolve(__dirname, '..', 'worchi_food.db');

fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

const db = new sqlite3.Database(DB_FILE);

const run = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function (err) {
    if (err) return reject(err);
    resolve({ id: this.lastID, changes: this.changes });
  });
});

const get = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) return reject(err);
    resolve(row || null);
  });
});

const all = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) return reject(err);
    resolve(rows || []);
  });
});

const bootstrap = async () => {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer',
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  await run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category_id INTEGER,
    image TEXT,
    available INTEGER DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )`);

  await run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    items TEXT NOT NULL,
    diners_count INTEGER,
    total_price REAL NOT NULL,
    customer_info TEXT,
    status TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  const admin = await get(`SELECT id FROM users WHERE email = ?`, ['admin@worchi-food.com']);
  if (!admin) {
    const defaultHash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
    await run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, [
      'Administrador',
      'admin@worchi-food.com',
      defaultHash,
      'admin'
    ]);
  }

  const productCount = await get(`SELECT COUNT(1) as c FROM products`);
  if (!productCount || productCount.c === 0) {
    const categories = [
      ['Entradas', 'Aperitivos y entradas'],
      ['Platos Principales', 'Platos principales del menú'],
      ['Postres', 'Postres y dulces'],
      ['Bebidas', 'Bebidas frías y calientes']
    ];
    for (const [name, desc] of categories) {
      await run(`INSERT INTO categories (name, description) VALUES (?, ?)`, [name, desc]);
    }

    const products = [
      ['Empanadas Criollas', 'Empanadas de carne cortada a cuchillo', 2500, 1, '/images/empanadas-criollas.webp', 1],
      ['Provoleta', 'Queso provolone a la parrilla con oregano', 3200, 1, '/images/proveleta.avif', 1],
      ['Bife de Chorizo', 'Bife de chorizo de 400g con guarnición', 8500, 2, '/images/bife-chorizo.webp', 1],
      ['Milanesa Napolitana', 'Milanesa con jamón, queso y salsa', 6800, 2, '/images/milanesa-napolitana.jpg', 1],
      ['Pasta Bolognesa', 'Fideos con salsa bolognesa casera', 5200, 2, '/images/boloñesa.jpg', 1],
      ['Flan Casero', 'Flan casero con dulce de leche', 2800, 3, '/images/flan-casero.avif', 1],
      ['Tiramisu', 'Tiramisu italiano tradicional', 3500, 3, '/images/tiramisu.jpg', 1],
      ['Coca Cola', 'Gaseosa Coca Cola 500ml', 1200, 4, '/images/coca-cola.jpg', 1],
      ['Agua Mineral', 'Agua mineral sin gas 500ml', 800, 4, '/images/agua-mineral.jpg', 1],
      ['Vino Tinto', 'Copa de vino tinto de la casa', 2200, 4, '/images/vino-tinti.webp', 1]
    ];
    for (const p of products) {
      await run(
        `INSERT INTO products (name, description, price, category_id, image, available) VALUES (?, ?, ?, ?, ?, ?)`,
        p
      );
    }
  }
};

bootstrap().catch(err => {
  console.error('Error inicializando la base de datos:', err);
});

module.exports = { db, run, get, all };
