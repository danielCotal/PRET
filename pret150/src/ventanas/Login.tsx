
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // --- LÓGICA DE AUTENTICACIÓN ACTUALIZADA ---
    const usersString = localStorage.getItem('users');
    const users = usersString ? JSON.parse(usersString) : [];

    // Buscamos un usuario que coincida con el email y la contraseña
    const foundUser = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Si el usuario se encuentra, procedemos a loguear
      const fakeAuthToken = `token-para-${foundUser.email}`;
      const userProfile = {
        nombre: foundUser.nombre,
        email: foundUser.email,
        rol: foundUser.rol,
      };

      localStorage.setItem('authToken', fakeAuthToken);
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      
      navigate('/home');
    } else {
      // Si no se encuentra, mostramos un error
      alert('Correo o contraseña incorrectos.');
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
        {/* Enlace para ir a la página de registro */}
        <div className="form-switcher-text">
          ¿No tienes una cuenta? <Link to="/register">Crea una aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;