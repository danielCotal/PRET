import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useProfile } from '../context/ProfileContext'; // 1. Importa el hook

const Home = () => {
  const navigate = useNavigate();
  const { avatarUrl } = useProfile(); // 2. Obtiene el avatarUrl del Context

  // ... (el resto de la lógica de useEffect y handleLogout no cambia)
   useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        {/* ... (el sidebar no cambia) ... */}
        <h2>Menú</h2>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/perfil')} className="sidebar-button">
            Mi Perfil
          </button>
          <button className="sidebar-button">
            Opciones
          </button>
        </nav>
        <button onClick={handleLogout} className="sidebar-button logout-button">
          Cerrar Sesión
        </button>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h1>Calendario de Reservas</h1>
          {/* 3. Usa el avatarUrl del Context aquí */}
          <img src={avatarUrl} alt="Perfil" />
        </header>
        <main className="calendar-wrapper">
          {/* ... (el resto del contenido no cambia) ... */}
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