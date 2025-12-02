// base de datos en memoria para evitar problemas de instalacion
const db = {
  users: [
    {
      id: 1,
      name: 'Administrador',
      email: 'admin@worchi-food.com',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
      role: 'admin'
    }
  ],
  products: [
    { id: 1, name: 'Empanadas Criollas', description: 'Empanadas de carne cortada a cuchillo', price: 2500, category_id: 1, image: '/images/empanadas.jpg', available: true },
    { id: 2, name: 'Provoleta', description: 'Queso provolone a la parrilla con oregano', price: 3200, category_id: 1, image: '/images/provoleta.jpg', available: true },
    { id: 3, name: 'Bife de Chorizo', description: 'Bife de chorizo de 400g con guarnición', price: 8500, category_id: 2, image: '/images/bife.jpg', available: true },
    { id: 4, name: 'Milanesa Napolitana', description: 'Milanesa con jamón, queso y salsa', price: 6800, category_id: 2, image: '/images/milanesa.jpg', available: true },
    { id: 5, name: 'Pasta Bolognesa', description: 'Fideos con salsa bolognesa casera', price: 5200, category_id: 2, image: '/images/pasta.jpg', available: true },
    { id: 6, name: 'Flan Casero', description: 'Flan casero con dulce de leche', price: 2800, category_id: 3, image: '/images/flan.jpg', available: true },
    { id: 7, name: 'Tiramisu', description: 'Tiramisu italiano tradicional', price: 3500, category_id: 3, image: '/images/tiramisu.jpg', available: true },
    { id: 8, name: 'Coca Cola', description: 'Gaseosa Coca Cola 500ml', price: 1200, category_id: 4, image: '/images/coca.jpg', available: true },
    { id: 9, name: 'Agua Mineral', description: 'Agua mineral sin gas 500ml', price: 800, category_id: 4, image: '/images/agua.jpg', available: true },
    { id: 10, name: 'Vino Tinto', description: 'Copa de vino tinto de la casa', price: 2200, category_id: 4, image: '/images/vino.jpg', available: true }
  ],
  categories: [
    { id: 1, name: 'Entradas', description: 'Aperitivos y entradas' },
    { id: 2, name: 'Platos Principales', description: 'Platos principales del menú' },
    { id: 3, name: 'Postres', description: 'Postres y dulces' },
    { id: 4, name: 'Bebidas', description: 'Bebidas frías y calientes' }
  ],
  orders: [],
  order_items: [],
  nextUserId: 2,
  nextOrderId: 1
};

module.exports = db;