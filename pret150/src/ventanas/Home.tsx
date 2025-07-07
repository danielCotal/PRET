// En: pret150/src/ventanas/Home.tsx (versión final con reservas)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Plugin para interactividad
import { useProfile } from '../context/ProfileContext';

// --- Interfaces para tipar los datos ---
interface Workspace {
  id: number;
  name: string;
  type: string;
  capacity: number;
}

interface Reservation {
  id: number;
  start_time: string;
  end_time: string;
  workspace_name: string;
  workspace_type: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { avatarUrl } = useProfile();

  // --- Estados del Componente ---
  const [view, setView] = useState<'calendar' | 'my_reservations'>('calendar');
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('authToken');

  // --- Función reutilizable para hacer peticiones autenticadas ---
  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ocurrió un error en la petición.');
    }
    return response.json();
  };

  // --- Efecto para cargar datos iniciales (workspaces y reservas) ---
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Cargar espacios de trabajo
    const fetchWorkspaces = async () => {
      try {
        const data = await authenticatedFetch(`${apiUrl}/api/workspaces`);
        setWorkspaces(data);
        if (data.length > 0) {
          setSelectedWorkspace(data[0].id.toString()); // Seleccionar el primero por defecto
        }
      } catch (err) {
        console.error('Error al cargar workspaces:', err);
      }
    };

    // Cargar mis reservas
    const fetchMyReservations = async () => {
      try {
        const data = await authenticatedFetch(`${apiUrl}/api/reservations/my-reservations`);
        setReservations(data);
      } catch (err) {
        console.error('Error al cargar reservas:', err);
      }
    };

    fetchWorkspaces();
    fetchMyReservations();
  }, [apiUrl, navigate, token]);

  // --- Manejadores de Eventos ---

  // Se activa al hacer clic en una fecha del calendario
  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr);
    setIsModalOpen(true);
    setError(null);
  };

  // Se activa al enviar el formulario del modal
  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const reservationData = {
      workspace_id: parseInt(selectedWorkspace, 10),
      start_time: `${selectedDate}T09:00:00Z`, // Asumimos un horario fijo por ahora
      end_time: `${selectedDate}T17:00:00Z`,
    };

    try {
      const newReservation = await authenticatedFetch(`${apiUrl}/api/reservations`, {
        method: 'POST',
        body: JSON.stringify(reservationData),
      });
      
      // Actualizamos la lista de reservas localmente para que se refleje en la UI
      setReservations(prev => [...prev, newReservation]);
      setIsModalOpen(false);
      alert('¡Reserva creada con éxito!');

    } catch (err: any) {
      console.error('Error al crear reserva:', err);
      setError(err.message);
    }
  };
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Formateamos las reservas para que FullCalendar las entienda
  const calendarEvents = reservations.map(res => ({
    title: res.workspace_name,
    start: res.start_time,
    end: res.end_time,
  }));

  return (
    <div className="home-container">
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        <h2>Menú</h2>
        <nav className="sidebar-nav">
          <button onClick={() => setView('calendar')} className={`sidebar-button ${view === 'calendar' ? 'active' : ''}`}>
            Calendario
          </button>
          <button onClick={() => setView('my_reservations')} className={`sidebar-button ${view === 'my_reservations' ? 'active' : ''}`}>
            Mis Reservas
          </button>
          <button onClick={() => navigate('/perfil')} className="sidebar-button">
            Mi Perfil
          </button>
        </nav>
        <button onClick={handleLogout} className="sidebar-button logout-button">
          Cerrar Sesión
        </button>
      </aside>

      {/* --- Contenido Principal --- */}
      <div className="main-content">
        <header className="main-header">
          <h1>{view === 'calendar' ? 'Calendario de Reservas' : 'Mis Reservas'}</h1>
          <img src={avatarUrl} alt="Perfil" />
        </header>

        <main className="calendar-wrapper">
          {view === 'calendar' && (
            <div className="calendar-container">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto"
                locale="es"
                events={calendarEvents}
                dateClick={handleDateClick} // Habilitamos el clic en fechas
                selectable={true}
              />
            </div>
          )}

          {view === 'my_reservations' && (
            <div className="reservations-list-container">
              {reservations.length > 0 ? (
                <ul className="reservations-list">
                  {reservations.map(res => (
                    <li key={res.id} className="reservation-item">
                      <strong>{res.workspace_name}</strong> ({res.workspace_type})
                      <span>Fecha: {new Date(res.start_time).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tienes ninguna reserva todavía.</p>
              )}
            </div>
          )}
        </main>
      </div>

      {/* --- Modal para Nueva Reserva --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Crear Nueva Reserva</h3>
            <p>Fecha seleccionada: <strong>{new Date(selectedDate).toLocaleDateString()}</strong></p>
            <form onSubmit={handleReservationSubmit}>
              <div className="form-group">
                <label htmlFor="workspace">Selecciona un Espacio:</label>
                <select 
                  id="workspace" 
                  value={selectedWorkspace}
                  onChange={(e) => setSelectedWorkspace(e.target.value)}
                  required
                >
                  {workspaces.length > 0 ? (
                    workspaces.map(ws => (
                      <option key={ws.id} value={ws.id}>
                        {ws.name} (Capacidad: {ws.capacity})
                      </option>
                    ))
                  ) : (
                    <option disabled>No hay espacios disponibles.</option>
                  )}
                </select>
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)} className="button-secondary">
                  Cancelar
                </button>
                <button type="submit" className="button-primary">
                  Confirmar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
