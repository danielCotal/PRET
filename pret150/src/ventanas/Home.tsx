import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Home = () => {
  const navigate = useNavigate();

  // EFECTO 2: Proteger esta ruta.
  // Si no hay token en localStorage, redirige al login.
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // 1. Limpiar localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
    // localStorage.clear(); // Alternativa que borra todo

    // 2. Redirigir a la página de login
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Menú</h2>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/perfil')} className="sidebar-button">
            Mi Perfil
          </button>
          <button className="sidebar-button">Opciones</button>
        </nav>
        {/* Conectamos la función de logout al botón */}
        <button onClick={handleLogout} className="sidebar-button logout-button">
          Cerrar Sesión
        </button>
      </aside>

      {/* Contenido principal (sin cambios) */}
      <div className="main-content">
        <header className="main-header">
          <h1>Calendario de Reservas</h1>
          <img src="/profile.jpg" alt="Perfil" />
        </header>
        <main className="calendar-wrapper">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="auto"
              locale="es"
              buttonText={{ today: 'Hoy' }}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;