// En src/ventanas/Home.tsx
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Menú</h2>
        <nav className="sidebar-nav">
          <button
            onClick={() => navigate('/perfil')}
            className="sidebar-button"
          >
            Mi Perfil
          </button>
          <button className="sidebar-button">
            Opciones
          </button>
        </nav>
        <button className="sidebar-button logout-button">Cerrar Sesión</button>
      </aside>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Barra superior */}
        <header className="main-header">
          <h1>Calendario de Reservas</h1>
          {/* Asegúrate de tener una imagen en la carpeta public o ajusta la ruta */}
          <img src="/profile.jpg" alt="Perfil" />
        </header>

        {/* Calendario */}
        <main className="calendar-wrapper">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="auto"
              locale="es"
              buttonText={{
                today: 'Hoy',
              }}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay' // Opciones de vista
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;