// En: backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importamos nuestras rutas
const authRoutes = require('./routes/auth.routes');
const workspaceRoutes = require('./routes/workspace.routes');
const reservationRoutes = require('./routes/reserva.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/api/test', (req, res) => {
  console.log('--- Petición recibida en /api/test ---');
  
  const testData = {
    status: 'ok',
    message: 'Si puedes ver esto, el problema no es Express.',
    timestamp: new Date().toISOString()
  };
  
  console.log('Enviando respuesta JSON de prueba...');
  
  // Enviamos la respuesta de la forma más explícita posible
  return res.status(200).json(testData);
});

// Usamos las rutas con sus prefijos
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/reservations', reservationRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('API del Calendario corriendo.');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});