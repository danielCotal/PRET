import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// No es necesario importar CSS manualmente

const Home = () => (
  <div className="flex h-screen">
    {/* Sidebar */}
    <aside className="w-64 bg-blue-600 text-white flex flex-col py-8 px-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Menú</h2>
      <button className="py-2 px-4 hover:bg-blue-700 rounded">Mi Perfil</button>
      <button className="py-2 px-4 hover:bg-blue-700 rounded">Opciones</button>
      <button className="mt-auto py-2 px-4 bg-red-600 hover:bg-red-700 rounded">Cerrar Sesión</button>
    </aside>

    {/* Contenido Principal */}
    <div className="flex flex-col flex-grow">
      {/* Barra superior */}
      <header className="h-16 bg-white border-b flex items-center justify-end px-6 shadow-sm">
        <img src="/profile.jpg" alt="Perfil" className="w-10 h-10 rounded-full" />
      </header>

      {/* Calendario */}
      <main className="flex-grow bg-gray-100 p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">Calendario de Reservas</h1>
        <div className="bg-white shadow rounded p-4">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            height="auto"
          />
        </div>
      </main>
    </div>
  </div>
);

export default Home;
