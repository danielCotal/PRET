// En: backend/controllers/reservation.controller.js

const pool = require('../DB/db_connections.js');

// --- Controlador para CREAR una nueva reserva ---
const createReservation = async (req, res) => {
  try {
    const userId = req.user.id; // Obtenemos el ID del usuario desde el token verificado por el middleware
    const { workspace_id, start_time, end_time } = req.body;

    if (!workspace_id || !start_time || !end_time) {
      return res.status(400).json({ error: 'Faltan datos para la reserva.' });
    }

    // Lógica para verificar que no haya reservas solapadas (simplificada)
    // En una app real, esta consulta sería más compleja.
    const overlapQuery = `
      SELECT * FROM reservations 
      WHERE workspace_id = $1 AND (start_time, end_time) OVERLAPS ($2, $3)
    `;
    const existingReservations = await pool.query(overlapQuery, [workspace_id, start_time, end_time]);
    
    if (existingReservations.rows.length > 0) {
        return res.status(409).json({ error: 'El espacio ya está reservado en ese horario.' });
    }

    const insertQuery = `
      INSERT INTO reservations (user_id, workspace_id, start_time, end_time) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const { rows } = await pool.query(insertQuery, [userId, workspace_id, start_time, end_time]);
    res.status(201).json(rows[0]);

  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// --- Controlador para OBTENER las reservas del usuario logueado ---
const getMyReservations = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT r.id, r.start_time, r.end_time, r.status, w.name AS workspace_name, w.type AS workspace_type
      FROM reservations r
      JOIN workspaces w ON r.workspace_id = w.id
      WHERE r.user_id = $1
      ORDER BY r.start_time DESC;
    `;
    const { rows } = await pool.query(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


module.exports = {
  createReservation,
  getMyReservations,
};