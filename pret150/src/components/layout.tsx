import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  titulo?: string;
  volver?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, titulo, volver }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-green-400 text-white">
      {/* Barra superior */}
      <header className="h-16 flex items-center px-4 border-b border-white/20 shadow-md bg-transparent">
        {volver && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-1 bg-black bg-opacity-30 rounded hover:bg-opacity-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>
        )}
        <h1 className="mx-auto text-xl font-bold">{titulo}</h1>
      </header>

      {/* Contenido */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
