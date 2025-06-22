require('dotenv').config(); // Siempre al principio
const express = require('express');
const cors = require('cors');

// Importamos nuestras rutas
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Usamos las rutas
// Todas las rutas definidas en authRoutes ahora tendrán el prefijo "/api/auth"
app.use('/api/auth', authRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('API del Calendario corriendo.');
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});