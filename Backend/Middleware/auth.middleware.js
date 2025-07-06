// En: backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedUser; // Añadimos la info del usuario (ej. {id: 1, email: '...'}) a la petición
    next(); // Pasamos al siguiente middleware o al controlador
  } catch (error) {
    res.status(403).json({ error: 'Token inválido.' });
  }
};

module.exports = verifyToken;