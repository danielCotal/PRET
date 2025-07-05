// En: backend/routes/reservation.routes.js
const express = require('express');
const router = express.Router();
const { createReservation, getMyReservations } = require('../controllers/reserva.controller');
const verifyToken = require('../Middleware/auth.middleware');

// TODAS las rutas de reservas requieren que el usuario esté autenticado.
// Por eso, aplicamos el middleware a todas.
router.post('/', verifyToken, createReservation);
router.get('/my-reservations', verifyToken, getMyReservations);

module.exports = router;