const express = require('express');
const router = express.Router();

// Importamos los controladores que acabamos de crear
const { registerUser, loginUser } = require('../controllers/authController');

// Definimos las rutas y el método HTTP, y le asignamos un controlador
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router; // Exportamos el router para usarlo en index.js