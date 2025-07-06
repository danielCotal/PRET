const pool = require('../DB/db_connections.js');
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
        return res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error('Error en el registro:', error);
        if (error.code === '23505') {
            return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
        }
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


// --- Controlador para INICIAR SESIÓN (con logs y res.send) ---
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Error: Faltan email o password.');
            return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
        }

        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(userQuery, [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        const responsePayload = {
            message: 'Inicio de sesión exitoso',
            token: token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
            },
        };
        // *** CAMBIO CLAVE AQUÍ ***
        return res.status(200).send(responsePayload);

    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


module.exports = {
    registerUser,
    loginUser,
};