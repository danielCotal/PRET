import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Obtenemos la lista de usuarios existente de localStorage
    const usersString = localStorage.getItem('users');
    const users = usersString ? JSON.parse(usersString) : [];

    // 2. Verificamos si el correo ya está registrado
    const userExists = users.some((user: any) => user.email === email);
    if (userExists) {
      alert('Este correo electrónico ya está registrado.');
      return;
    }

    // 3. Creamos el nuevo perfil de usuario
    const newUser = {
      nombre,
      email,
      password, // En una app real, la contraseña debe ser "hasheada" (encriptada)
      rol: 'Usuario',
    };

    // 4. Añadimos el nuevo usuario a la lista
    users.push(newUser);

    // 5. Guardamos la lista actualizada de usuarios en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
    
    // 6. Redirigimos al usuario a la página de login
    navigate('/login');
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2>Crear Nueva Cuenta</h2>
        <form onSubmit={handleRegister} className="login-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="login-button">Registrarse</button>
        </form>
        <div className="form-switcher-text">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;