// En: pret150/src/ventanas/perfil.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

// Interfaz para el formulario
interface ProfileFormState {
  nombre: string;
  email: string;
}

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const { avatarUrl, profile, setProfile } = useProfile(); // Obtenemos setProfile del context
  
  const [formData, setFormData] = useState<ProfileFormState>({ nombre: '', email: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('authToken');

  // Efecto para llenar el formulario con los datos del perfil del context
  useEffect(() => {
    if (profile) {
      setFormData({ nombre: profile.nombre, email: profile.correo });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${apiUrl}/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const updatedUser = await response.json();

      if (!response.ok) {
        throw new Error(updatedUser.error || 'No se pudo actualizar el perfil.');
      }

      // Actualizamos el estado global y el localStorage
      setProfile(updatedUser);
      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
      setSuccess('¡Perfil actualizado con éxito!');

    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    // Usamos window.confirm como una confirmación simple.
    // En una app real, un modal personalizado sería mejor.
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible y borrará todas tus reservas.')) {
      try {
        await fetch(`${apiUrl}/api/users/me`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        // Limpiamos todo y redirigimos al login
        localStorage.clear();
        navigate('/login');

      } catch (err: any) {
        setError(err.message || 'No se pudo eliminar la cuenta.');
      }
    }
  };
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2>Menú</h2>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/home')} className="sidebar-button">Calendario</button>
          <button className="sidebar-button">Opciones</button>
        </nav>
        <button onClick={handleLogout} className="sidebar-button logout-button">Cerrar Sesión</button>
      </aside>

      <div className="profile-page-wrapper">
        <div className="profile-card">
          <img src={avatarUrl} alt="Avatar" className="profile-avatar" />
          
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <button type="submit" className="button-primary">Guardar Cambios</button>
          </form>

          <div className="danger-zone">
            <h4>Zona de Peligro</h4>
            <p>La eliminación de la cuenta es permanente.</p>
            <button onClick={handleDeleteAccount} className="button-danger">Eliminar Mi Cuenta</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
