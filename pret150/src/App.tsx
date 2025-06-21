import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './ventanas/Home';
import Perfil from './ventanas/perfil';
import Login from './ventanas/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/" element={<Login />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
