const { Pool } = require('pg');

// El Pool de conexiones usará automáticamente la variable de entorno DATABASE_URL
// que definimos en nuestro archivo .env, por lo que no necesitamos escribir las credenciales aquí.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = pool; // Exportamos el pool para usarlo en los controladores