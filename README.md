# 🍽️ WORCHI - FOOD - E-commerce Restaurante

**Proyecto Académico - IMRRI, PP y BASES DE DATOS**

Aplicación web completa de e-commerce para restaurante que permite realizar pedidos de comidas y bebidas con límite de 4 artículos por comensal.

## ✅ Requisitos Implementados

- ✅ **Interfaz React JS** optimizada para móviles
- ✅ **Base de datos MySQL** con productos y pedidos
- ✅ **API Node.js + Express** para comunicación frontend-backend
- ✅ **Login y Registro** de usuarios con JWT
- ✅ **Sistema de comensales** (1-6 personas por mesa)
- ✅ **Límite de carrito** (4 artículos por comensal)
- ✅ **Categorías requeridas**: Entradas, Platos Principales, Postres, Bebidas
- ✅ **Panel de administración** (opcional)

## 🚀 Tecnologías

**Frontend:**
- React 19 + Vite
- Tailwind CSS
- Context API
- Axios
- Responsive Design

**Backend:**
- Node.js + Express
- MySQL
- JWT Authentication
- bcryptjs

## 📦 Instalación

### 1. Base de Datos
```bash
# Crear base de datos y tablas
mysql -u root -p < database/schema.sql
```

### 2. Backend
```bash
cd server
npm install
# Configurar .env con tus credenciales MySQL
npm run dev
```

### 3. Frontend
```bash
cd client
npm install
npm run dev
```

## 🏗️ Estructura del Proyecto

```
ecommerce-restaurante/
├── client/                  # Frontend React
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── context/         # Context API (CartContext)
│   │   ├── utils/           # API configuration
│   │   └── ...
├── server/                  # Backend Node.js
│   ├── models/              # Modelos de BD
│   ├── routes/              # Rutas API
│   ├── middlewares/         # Middleware JWT
│   └── config/              # Configuración BD
├── database/                # Scripts SQL
│   └── schema.sql           # Esquema completo con datos
└── README.md
```

## 🎯 Funcionalidades Principales

### Carrito Inteligente
- **Límite por comensal**: Máximo 4 artículos por persona
- **Configuración de mesa**: 1-6 comensales
- **Validación automática**: Bloquea agregar más artículos al alcanzar límite

### Categorías de Productos
- **Entradas**: Empanadas, Provoleta
- **Platos Principales**: Bife, Milanesa, Pasta
- **Postres**: Flan, Tiramisu
- **Bebidas**: Gaseosas, Agua, Vino

### Autenticación
- Registro de usuarios
- Login con JWT
- Protección de rutas

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Base de Datos**: MySQL (puerto 3306)

## 👤 Usuarios de Prueba

**Administrador:**
- Email: admin@worchi-food.com
- Password: admin123

## 📱 Responsive Design

- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm, md, lg, xl
- **Touch Friendly**: Botones y controles adaptados para táctil

## 🔒 Seguridad

- Passwords hasheados con bcrypt
- Autenticación JWT
- Validación de datos
- Protección CORS

## 📊 Base de Datos

**Tablas principales:**
- `users` - Usuarios del sistema
- `categories` - Categorías de productos
- `products` - Productos del menú
- `orders` - Órdenes con número de comensales
- `order_items` - Items de cada orden

## 🎓 Evaluación Académica

- **IMRRI**: Interfaz responsive y experiencia de usuario
- **PP**: Lógica de programación y arquitectura
- **BASES DE DATOS**: Diseño y gestión de datos