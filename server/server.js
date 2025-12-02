const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
// puerto del servidor
const PORT = process.env.PORT || 5000;

// middlewares necesarios
app.use(cors());
app.use(express.json());

// rutas de la api
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// ruta principal
app.get('/', (req, res) => {
  res.json({ message: 'WORCHI - FOOD API funcionando correctamente!' });
});

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});