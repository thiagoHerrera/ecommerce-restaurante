# 🚀 GUÍA DE INSTALACIÓN - WORCHI FOOD

## 📋 Requisitos Previos

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js)
- **Git** (opcional, para clonar el proyecto)

## 📦 Instalación en Nueva Computadora

### 1. Descargar el Proyecto
```bash
# Opción A: Clonar desde repositorio
git clone [URL_DEL_REPOSITORIO]
cd ecommerce-restaurante

# Opción B: Descomprimir archivo ZIP
# Extraer el archivo y navegar a la carpeta
```

### 2. Instalar Dependencias del Servidor
```bash
cd server
npm install
```

### 3. Instalar Dependencias del Cliente
```bash
cd ../client
npm install
```

### 4. Configurar Variables de Entorno
```bash
# En la carpeta server, verificar que existe el archivo .env
# Si no existe, crearlo con:
PORT=5000
JWT_SECRET=worchi_food_secret_key_2024
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=worchi_food
```

## 🚀 Iniciar los Servidores

### Terminal 1 - Servidor Backend
```bash
cd server
npm run dev
# O alternativamente: npm start
```
**El servidor estará en:** http://localhost:5000

### Terminal 2 - Cliente Frontend
```bash
cd client
npm run dev
```
**La aplicación estará en:** http://localhost:5173

## ✅ Verificar Funcionamiento

1. **Backend:** Ir a http://localhost:5000 - debe mostrar mensaje de API funcionando
2. **Frontend:** Ir a http://localhost:5173 - debe cargar la página principal
3. **Base de Datos:** Se crea automáticamente al iniciar el servidor

## 🔧 Comandos Útiles

### Servidor (Backend)
```bash
npm start          # Iniciar servidor
npm run dev        # Iniciar con nodemon (reinicio automático)
```

### Cliente (Frontend)
```bash
npm run dev        # Servidor de desarrollo
npm run build      # Compilar para producción
npm run preview    # Vista previa de producción
```

## 🗄️ Base de Datos

- **Tipo:** SQLite (archivo local)
- **Ubicación:** `server/worchi_food.db`
- **Inicialización:** Automática al iniciar el servidor
- **Datos de prueba:** Se cargan automáticamente

### Usuario Admin por Defecto
- **Email:** admin@worchi-food.com
- **Contraseña:** admin123

## 🛠️ Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
```bash
# Cambiar puerto en .env (servidor) o vite.config.js (cliente)
```

### Error de Base de Datos
```bash
# Eliminar archivo de BD para recrear
rm server/worchi_food.db
# Reiniciar servidor
```

## 📱 Funcionalidades Principales

- ✅ Registro y login de usuarios
- ✅ Carrito de compras (máximo 4 productos por comensal)
- ✅ Gestión de comensales (1-6 personas)
- ✅ Menú organizado por categorías
- ✅ Sistema de favoritos
- ✅ Historial de pedidos
- ✅ Panel de administración

## 🌐 URLs de Acceso

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Base de Datos:** SQLite local (no requiere servidor)

## 📞 Soporte

Si tienes problemas con la instalación:
1. Verificar que Node.js esté instalado: `node --version`
2. Verificar que npm esté instalado: `npm --version`
3. Asegurarse de estar en la carpeta correcta
4. Revisar que los puertos 5000 y 5173 estén libres