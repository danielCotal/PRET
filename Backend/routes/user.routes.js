const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');

// Todas las rutas de perfil están protegidas y requieren un token válido.
// El middleware 'verifyToken' se ejecutará antes que cada controlador.
router.get('/me', verifyToken, getUserProfile);
router.put('/me', verifyToken, updateUserProfile);
router.delete('/me', verifyToken, deleteUserProfile);

module.exports = router;