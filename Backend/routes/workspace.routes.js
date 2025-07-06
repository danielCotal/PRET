// En: backend/routes/workspace.routes.js
const express = require('express');
const router = express.Router();
const { getAllWorkspaces, getWorkspaceById, createWorkspace } = require('../controllers/workspace.controller');
const verifyToken = require('../middleware/auth.middleware'); // Suponiendo que crear espacios es para admins

// Rutas públicas
router.get('/', getAllWorkspaces);
router.get('/:id', getWorkspaceById);

// Ruta protegida (ejemplo, solo un usuario logueado podría crear)
router.post('/', verifyToken, createWorkspace);

module.exports = router;