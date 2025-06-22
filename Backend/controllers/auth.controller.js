const pool = require('../db/database'); // Importa la conexión a la BD
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- Controlador para REGISTRAR USUARIO ---
const registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertQuery = `
      INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3)
      RETURNING id, nombre, email;
    `;
    
    const newUser = await pool.query(insertQuery, [nombre, email, hashedPassword]);

    res.status(201).json(newUser.rows[0]);

  } catch (error) {
    console.error('Error en el registro:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// --- Controlador para INICIAR SESIÓN ---
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
    }
    
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(userQuery, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' }); // Usuario no encontrado
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas.' }); // Contraseña incorrecta
    }

    // Si todo es correcto, creamos un Token (JWT)
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviamos el token y los datos del usuario (sin la contraseña)
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


module.exports = {
  registerUser,
  loginUser,
};