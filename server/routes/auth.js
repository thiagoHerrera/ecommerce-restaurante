const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// registro de usuarios
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // verificar si ya existe el usuario
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese email' });
    }
    
    // crear nuevo usuario
    const userId = await User.create({ name, email, password });
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({ 
      message: 'Usuario registrado correctamente',
      token,
      user: { id: userId, name, email }
    });
  } catch (error) {
    console.log('Error en registro:', error);
    res.status(500).json({ error: error.message });
  }
});

// login de usuarios
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // buscar usuario por email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    
    // validar contraseña
    const isValidPassword = await User.validatePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    
    // generar token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.log('Error en login:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;