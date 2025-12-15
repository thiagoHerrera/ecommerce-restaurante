-- Seed: Crear usuario administrador
INSERT OR IGNORE INTO users (name, email, password, role) VALUES
('Administrador', 'admin@worchi-food.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');