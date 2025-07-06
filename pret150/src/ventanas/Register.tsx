import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Para mostrar errores
  const navigate = useNavigate();

  // Obtenemos la URL de la API desde las variables de entorno
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiamos errores previos

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si la respuesta del servidor no es exitosa (ej. 409, 500)
        throw new Error(data.error || 'Ocurrió un error al registrar.');
      }

      alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
      navigate('/login');

    } catch (err: any) {
      console.error('Error en el registro:', err);
      setError(err.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2>Crear Nueva Cuenta</h2>
        <form onSubmit={handleRegister} className="login-form">
          {/* ... (los inputs del formulario no cambian) ... */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Registrarse</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        <div className="form-switcher-text">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;