import React from 'react';
import Layout from '../components/layout';

const Perfil: React.FC = () => {
  const usuario = {
    nombre: 'Daniel Pérez',
    correo: 'daniel.perez@email.com',
    rol: 'Administrador',
    avatar: 'https://ui-avatars.com/api/?name=Daniel+Pérez'
  };

  return (
    <Layout titulo="Mi Perfil" volver>
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]"> {/* Centrado total */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
          <img
            src={usuario.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500"
          />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{usuario.nombre}</h2>
          <p className="text-gray-600 dark:text-gray-300">{usuario.correo}</p>
          <span className="mt-2 inline-block text-sm bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
            {usuario.rol}
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Perfil;
