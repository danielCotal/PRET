
const pool = require('../DB/db_connections.js');

// --- Controlador para OBTENER el perfil del usuario logueado ---
const getUserProfile = async (req, res) => {
  try {
    // El ID del usuario se obtiene del token JWT, que fue verificado por el middleware
    const userId = req.user.id;
    
    const query = 'SELECT id, nombre, email, rol FROM users WHERE id = $1';
    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// --- Controlador para ACTUALIZAR el perfil del usuario logueado ---
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y email son obligatorios.' });
    }

    const updateQuery = `
      UPDATE users 
      SET nombre = $1, email = $2 
      WHERE id = $3 
      RETURNING id, nombre, email, rol;
    `;
    const { rows } = await pool.query(updateQuery, [nombre, email, userId]);

    res.json(rows[0]);
  } catch (error)
  {
    console.error('Error al actualizar el perfil:', error);
    if (error.code === '23505') { // Error de email duplicado
        return res.status(409).json({ error: 'El correo electrónico ya está en uso por otra cuenta.' });
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// --- Controlador para ELIMINAR la cuenta del usuario logueado ---
const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // La restricción ON DELETE CASCADE en la tabla 'reservations'
    // se encargará de borrar las reservas del usuario automáticamente.
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    res.status(200).json({ message: 'Cuenta eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
