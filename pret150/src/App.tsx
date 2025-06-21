import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './ventanas/Home';
import Perfil from './ventanas/perfil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Perfil" element={<Perfil />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
