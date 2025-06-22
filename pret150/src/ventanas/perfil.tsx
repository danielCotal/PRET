import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext'; // 1. Importa el hook personalizado

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  // 2. Obtenemos todo lo que necesitamos del Context con una sola línea
  const { profile, avatarUrl, setUploadedImage, setAvatarColor } = useProfile();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string); // 3. Usamos la función del Context
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        {/* ... (el sidebar no cambia) ... */}
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

      {/* Contenido principal */}
      <div className="profile-page-wrapper">
        <div className="profile-card">
          <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*"/>
          <img
            src={avatarUrl} // 4. Usamos el avatarUrl del Context
            alt="Avatar"
            className="profile-avatar profile-avatar-interactive"
            onClick={handleAvatarClick}
            title="Haz clic para cambiar la imagen"
          />
          <h2 className="profile-name">{profile.nombre}</h2>
          <p className="profile-email">{profile.correo}</p>
          <span className="profile-role-badge">{profile.rol || 'Usuario'}</span>
          <div className="color-picker-group">
            <label htmlFor="avatarColor">Color del Fondo del Avatar</label>
            <input
              id="avatarColor"
              type="color"
              className="color-picker-input"
              defaultValue={`#${'3b82f6'}`} // Valor inicial
              onChange={(e) => setAvatarColor(e.target.value.substring(1))} // 5. Usamos la función del Context
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;