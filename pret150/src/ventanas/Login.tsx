// En: src/ventanas/Login.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // EFECTO 1: Redirigir si el usuario ya está logueado
  // Se ejecuta una sola vez cuando el componente se monta.
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir que la página se recargue

    // --- SIMULACIÓN DE AUTENTICACIÓN ---
    // En una aplicación real, aquí harías una llamada a tu backend.
    if (email === 'user@example.com' && password === '1234') {
      
      // 1. Crear un token y perfil de usuario falsos
      const fakeAuthToken = 'un-token-secreto-generado-en-login-12345';
      const userProfile = {
        name: 'Daniel',
        email: 'user@example.com',
      };

      // 2. Guardar en localStorage
      localStorage.setItem('authToken', fakeAuthToken);
      localStorage.setItem('userProfile', JSON.stringify(userProfile));

      // 3. Redirigir a la página de Home
      navigate('/home');

    } else {
      alert('Credenciales incorrectas. Intenta con user@example.com y 1234');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;