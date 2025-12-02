CREATE DATABASE IF NOT EXISTS worchi_food;
USE worchi_food;

-- Tabla de usuarios
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer', 'admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de categorías (entradas, platos principales, postres, bebidas)
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

-- Tabla de productos
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255),
  category_id INT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla de órdenes (incluye número de comensales)
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  total DECIMAL(10,2) NOT NULL,
  diners_count INT NOT NULL DEFAULT 1,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de items de orden
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insertar categorías requeridas
INSERT INTO categories (name, description) VALUES
('Entradas', 'Aperitivos y entradas'),
('Platos Principales', 'Platos principales del menú'),
('Postres', 'Postres y dulces'),
('Bebidas', 'Bebidas frías y calientes');

-- Insertar productos de prueba
INSERT INTO products (name, description, price, category_id, image) VALUES
-- Entradas
('Empanadas Criollas', 'Empanadas de carne cortada a cuchillo', 2500.00, 1, '/images/empanadas.jpg'),
('Provoleta', 'Queso provolone a la parrilla con oregano', 3200.00, 1, '/images/provoleta.jpg'),
-- Platos Principales
('Bife de Chorizo', 'Bife de chorizo de 400g con guarnición', 8500.00, 2, '/images/bife.jpg'),
('Milanesa Napolitana', 'Milanesa con jamón, queso y salsa', 6800.00, 2, '/images/milanesa.jpg'),
('Pasta Bolognesa', 'Fideos con salsa bolognesa casera', 5200.00, 2, '/images/pasta.jpg'),
-- Postres
('Flan Casero', 'Flan casero con dulce de leche', 2800.00, 3, '/images/flan.jpg'),
('Tiramisu', 'Tiramisu italiano tradicional', 3500.00, 3, '/images/tiramisu.jpg'),
-- Bebidas
('Coca Cola', 'Gaseosa Coca Cola 500ml', 1200.00, 4, '/images/coca.jpg'),
('Agua Mineral', 'Agua mineral sin gas 500ml', 800.00, 4, '/images/agua.jpg'),
('Vino Tinto', 'Copa de vino tinto de la casa', 2200.00, 4, '/images/vino.jpg');

-- Crear usuario admin de prueba (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Administrador', 'admin@worchi-food.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');