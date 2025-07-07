Plataforma de Reservas de Espacios - PRET
PRET (Plataforma de Reserva de Espacios de Trabajo) es una aplicación web full-stack diseñada para la gestión y reserva de espacios físicos en un entorno de trabajo, como escritorios, oficinas y salas de reuniones.

🚀 Despliegues en Vivo
Frontend (Vercel): https://pret-tawny.vercel.app/

Backend (Render): https://pret-gvto.onrender.com/

Repositorio GitHub: https://github.com/danielCotal/PRET.git

✨ Características Principales
Autenticación de Usuarios: Sistema completo de registro e inicio de sesión con sesiones seguras mediante JSON Web Tokens (JWT).

Gestión de Perfil: Los usuarios pueden ver y actualizar su información personal (nombre, email) y eliminar su cuenta de forma segura.

Calendario Interactivo: Interfaz visual para ver las reservas existentes y seleccionar fechas para crear nuevas reservas.

Sistema de Reservas: Flujo completo para crear una reserva de un espacio de trabajo disponible en una fecha específica.

Visualización de Reservas: Los usuarios pueden ver una lista de todas las reservas que han realizado.

API RESTful: Backend robusto y bien estructurado que sigue los principios REST para la comunicación con el cliente.

Arquitectura Desacoplada: Frontend y backend desarrollados y desplegados de forma independiente para mayor escalabilidad y mantenimiento.

🛠️ Stack Tecnológico
El proyecto está construido con una arquitectura de monorepo, separando el cliente y el servidor.

Frontend (pret150/)
Framework: React 18 (con Vite)

Lenguaje: TypeScript

Enrutamiento: React Router DOM

Calendario: FullCalendar

Estilos: CSS Puro

Despliegue: Vercel

Backend (Backend/)
Entorno de Ejecución: Node.js

Framework: Express.js

Lenguaje: JavaScript (ES6+)

Base de Datos: PostgreSQL

Librerías Clave:

pg: Driver para la conexión con PostgreSQL.

bcrypt: Para el hasheo seguro de contraseñas.

jsonwebtoken: Para la generación y verificación de tokens de sesión.

cors: Para habilitar peticiones desde otros dominios.

dotenv: Para la gestión de variables de entorno.

Despliegue: Render

⚙️ Configuración y Ejecución Local
Sigue estos pasos para levantar el proyecto en tu máquina local.

Prerrequisitos
Node.js (versión 16 o superior)

PostgreSQL instalado y corriendo.

Un cliente de Git como GitHub Desktop o Git por línea de comandos.

Pasos
Clonar el repositorio:

git clone https://github.com/danielCotal/PRET.git
cd PRET

Configurar la Base de Datos Local:

Abre pgAdmin 4 (o tu cliente de PostgreSQL preferido).

Crea una nueva base de datos llamada calendario_app_db.

Crea un nuevo usuario (rol de login) llamado calendario_user con una contraseña.

Ejecuta el script SQL que se encuentra en el proyecto para crear las tablas y otorgar los permisos necesarios.

Configurar el Backend:

Navega a la carpeta del backend: cd Backend

Instala las dependencias: npm install

Crea un archivo .env en la raíz de la carpeta Backend y añade las siguientes variables, reemplazando los valores según tu configuración:

PORT=3001
DATABASE_URL=postgresql://calendario_user:tu_contraseña@localhost:5432/calendario_app_db
JWT_SECRET=un_secreto_muy_dificil_de_adivinar

Inicia el servidor del backend:

npm start

El servidor estará corriendo en http://localhost:3001.

Configurar el Frontend:

Abre una nueva terminal.

Navega a la carpeta del frontend: cd pret150

Instala las dependencias: npm install

Crea un archivo .env.local en la raíz de la carpeta pret150 y añade la siguiente variable:

VITE_API_URL=http://localhost:3001

Inicia la aplicación de React:

npm run dev

La aplicación estará disponible en http://localhost:5173 (o el puerto que indique Vite).

¡Y listo! Ahora tienes el entorno completo corriendo en tu máquina.
