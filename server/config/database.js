const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// crear base de datos SQLite
const dbPath = path.join(__dirname, '..', 'worchi_food.db');
const db = new sqlite3.Database(dbPath);

// crear tablas si no existen
db.serialize(() => {
  // tabla usuarios
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // tabla categorias
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  )`);

  // tabla productos
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    category_id INTEGER,
    available BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )`);

  // tabla pedidos
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total REAL NOT NULL,
    diners_count INTEGER NOT NULL DEFAULT 1,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // tabla items de pedidos
  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  )`);

  // insertar datos iniciales
  db.get("SELECT COUNT(*) as count FROM categories", (err, row) => {
    if (row.count === 0) {
      // insertar categorias
      const categories = [
        ['Entradas', 'Aperitivos y entradas'],
        ['Platos Principales', 'Platos principales del menú'],
        ['Postres', 'Postres y dulces'],
        ['Bebidas', 'Bebidas frías y calientes']
      ];
      
      categories.forEach(cat => {
        db.run("INSERT INTO categories (name, description) VALUES (?, ?)", cat);
      });

      // insertar productos
      const products = [
        ['Empanadas Criollas', 'Empanadas de carne cortada a cuchillo', 2500, 1, '/images/empanadas.jpg'],
        ['Provoleta', 'Queso provolone a la parrilla con oregano', 3200, 1, '/images/provoleta.jpg'],
        ['Bife de Chorizo', 'Bife de chorizo de 400g con guarnición', 8500, 2, '/images/bife.jpg'],
        ['Milanesa Napolitana', 'Milanesa con jamón, queso y salsa', 6800, 2, '/images/milanesa.jpg'],
        ['Pasta Bolognesa', 'Fideos con salsa bolognesa casera', 5200, 2, '/images/pasta.jpg'],
        ['Flan Casero', 'Flan casero con dulce de leche', 2800, 3, '/images/flan.jpg'],
        ['Tiramisu', 'Tiramisu italiano tradicional', 3500, 3, '/images/tiramisu.jpg'],
        ['Coca Cola', 'Gaseosa Coca Cola 500ml', 1200, 4, '/images/coca.jpg'],
        ['Agua Mineral', 'Agua mineral sin gas 500ml', 800, 4, '/images/agua.jpg'],
        ['Vino Tinto', 'Copa de vino tinto de la casa', 2200, 4, '/images/vino.jpg']
      ];
      
      products.forEach(prod => {
        db.run("INSERT INTO products (name, description, price, category_id, image) VALUES (?, ?, ?, ?, ?)", prod);
      });

      // insertar usuario admin
      db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
        ['Administrador', 'admin@worchi-food.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin']);
    }
  });
});

module.exports = db;