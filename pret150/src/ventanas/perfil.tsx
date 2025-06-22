// En: src/ventanas/perfil.tsx (versión actualizada)

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Perfil: React.FC = () => {
  const navigate = useNavigate();

  // Obtenemos los datos del usuario desde localStorage
  const userProfileString = localStorage.getItem('userProfile');
  // Si no hay datos, usamos valores por defecto para evitar errores
  const usuario = userProfileString 
    ? JSON.parse(userProfileString) 
    : { nombre: 'Invitado', correo: 'No disponible', rol: 'Usuario' };
  
  // Añadimos el avatar dinámico
  usuario.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nombre)}&background=3b82f6&color=fff`;

  // Proteger la ruta: si no hay token, redirigir al login
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Reutilizamos la misma estructura y clases que en Home.tsx */}
      <aside className="sidebar">
        <h2>Menú</h2>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/home')} className="sidebar-button">
            Calendario
          </button>
          <button className="sidebar-button">
            Opciones
          </button>
        </nav>
        <button onClick={handleLogout} className="sidebar-button logout-button">
          Cerrar Sesión
        </button>
      </aside>

      {/* Aquí comienza el contenido específico de la página de perfil */}
      <div className="profile-page-wrapper">
        <div className="profile-card">
          <img
            src={usuario.avatar}
            alt="Avatar"
            className="profile-avatar"
          />
          <h2 className="profile-name">{usuario.nombre}</h2>
          <p className="profile-email">{usuario.correo}</p>
          <span className="profile-role-badge">
            {usuario.rol || 'Usuario'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Perfil;