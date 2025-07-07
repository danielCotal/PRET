import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  // Redirigir si ya hay un token
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${apiUrl.replace(/\/$/, '')}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al iniciar sesión.');
      }

      // ¡Guardamos el token y los datos del usuario!
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userProfile', JSON.stringify(data.user));
      
      // Forzamos un refresco para que el ProfileContext se actualice
      window.location.href = '/home';

    } catch (err: any) {
      console.error('Error en el login:', err);
      setError(err.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          {/* ... (los inputs del formulario no cambian) ... */}
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        <div className="form-switcher-text">
          ¿No tienes una cuenta? <Link to="/register">Crea una aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;