import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './ventanas/Home';
import Perfil from './ventanas/perfil';
import Login from './ventanas/Login';
import { ProfileProvider } from './context/ProfileContext'; // 1. Importa el Provider

function App() {
  return (
    <Router>
      {/* 2. Envuelve tus rutas con el ProfileProvider */}
      <ProfileProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </ProfileProvider>
    </Router>
  );
}

export default App;