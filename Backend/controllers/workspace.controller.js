// En: backend/controllers/workspace.controller.js

const pool = require('../DB/db_connections.js');

// --- Controlador para OBTENER TODOS los espacios de trabajo ---
const getAllWorkspaces = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM workspaces WHERE is_active = true ORDER BY name');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los espacios de trabajo:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// --- Controlador para OBTENER UN SOLO espacio de trabajo por su ID ---
const getWorkspaceById = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL
    const { rows } = await pool.query('SELECT * FROM workspaces WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Espacio de trabajo no encontrado.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(`Error al obtener el espacio de trabajo ${req.params.id}:`, error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// --- Controlador para CREAR un nuevo espacio de trabajo (Ruta para Admins) ---
const createWorkspace = async (req, res) => {
  try {
    const { name, type, capacity, description } = req.body;
    if (!name || !type || !capacity) {
      return res.status(400).json({ error: 'Nombre, tipo y capacidad son obligatorios.' });
    }

    const insertQuery = `
      INSERT INTO workspaces (name, type, capacity, description) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const { rows } = await pool.query(insertQuery, [name, type, capacity, description]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error al crear el espacio de trabajo:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
};