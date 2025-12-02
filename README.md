# 🍽️ WORCHI - FOOD - Sistema de Pedidos Online

**Proyecto Final - Materias: IMRRI, Programación y Bases de Datos**

Sistema web para restaurante donde los clientes pueden hacer pedidos de comida y bebidas. Cada comensal puede pedir máximo 4 productos.

## ✅ Funcionalidades Completadas

- ✅ **Frontend en React** que funciona en celulares
- ✅ **Base de datos MySQL** para guardar productos y pedidos
- ✅ **Backend con Node.js** para conectar frontend y base de datos
- ✅ **Sistema de usuarios** con registro y login
- ✅ **Configuración de mesa** de 1 a 6 comensales
- ✅ **Control de carrito** máximo 4 productos por persona
- ✅ **Menu organizado**: Entradas, Platos Principales, Postres, Bebidas
- ✅ **Panel de admin** para gestionar pedidos

## 🛠️ Tecnologías Usadas

**Frontend (Parte Visual):**
- React 19 con Vite
- Tailwind CSS para estilos
- Context API para el carrito
- Axios para llamadas a la API
- Diseño responsive

**Backend (Servidor):**
- Node.js con Express
- Base de datos MySQL
- Autenticación con JWT
- Encriptación con bcryptjs

## 📦 Como Instalar

### 1. Configurar Base de Datos
```bash
# Crear la base de datos
mysql -u root -p < database/schema.sql
```

### 2. Configurar Servidor
```bash
cd server
npm install
# Crear archivo .env con datos de MySQL
npm run dev
```

### 3. Configurar Cliente
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

## 🎯 Características Principales

### Sistema de Carrito
- **Limite por persona**: Cada comensal puede pedir 4 productos máximo
- **Mesa configurable**: Se puede elegir de 1 a 6 comensales
- **Control automático**: No deja agregar más productos cuando se llega al limite

### Menu del Restaurante
- **Entradas**: Empanadas, Provoleta
- **Platos Principales**: Bife, Milanesa, Pasta
- **Postres**: Flan, Tiramisu
- **Bebidas**: Gaseosas, Agua, Vino

### Sistema de Usuarios
- Los clientes se pueden registrar
- Login seguro con tokens
- Rutas protegidas

## 🌐 Direcciones Locales

- **Pagina Web**: http://localhost:5173
- **API del Servidor**: http://localhost:5000
- **Base de Datos**: MySQL en puerto 3306

## 👤 Usuario de Prueba

**Admin del Sistema:**
- Email: admin@worchi-food.com
- Contraseña: admin123

## 📱 Diseño Adaptable

- **Pensado para celular**: Funciona mejor en dispositivos móviles
- **Diferentes tamaños**: Se adapta a tablets y computadoras
- **Fácil de usar**: Botones grandes para tocar con el dedo

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Tokens JWT para autenticación
- Validación de formularios
- Protección contra ataques CORS

## 📊 Estructura de la Base de Datos

**Tablas que se usan:**
- `users` - Datos de los usuarios
- `categories` - Tipos de comida (entradas, platos, etc)
- `products` - Productos del menu
- `orders` - Pedidos realizados
- `order_items` - Productos de cada pedido

## 🎓 Para la Evaluación

- **IMRRI**: Diseño de la interfaz y usabilidad
- **Programación**: Lógica del código y estructura
- **Bases de Datos**: Como se organizan y manejan los datos