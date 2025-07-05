const pool = require('../DB/db_connections.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- Controlador para REGISTRAR USUARIO ---
// (No lo modificamos, ya que el registro parece funcionar)
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


// --- Controlador para INICIAR SESIÓN (con logs de depuración) ---
const loginUser = async (req, res) => {
    console.log('--- Inicia el proceso de login ---');
    try {
        const { email, password } = req.body;
        console.log('1. Datos recibidos:', { email, password });

        if (!email || !password) {
            console.log('Error: Faltan email o password.');
            return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
        }

        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(userQuery, [email]);
        const user = result.rows[0];

        if (!user) {
            console.log('Error: Usuario no encontrado en la BD.');
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }
        console.log('2. Usuario encontrado en la BD:', user.email);

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log('Error: La contraseña no coincide.');
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }
        console.log('3. La contraseña coincide.');

        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('4. Token JWT generado.');

        const responsePayload = {
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
            },
        };

        console.log('5. Enviando respuesta JSON al cliente...');
        res.status(200).json(responsePayload);
        console.log('--- Proceso de login finalizado con éxito ---');

    } catch (error) {
        console.error('Error CATASTRÓFICO en el login:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


module.exports = {
    registerUser,
    loginUser,
};