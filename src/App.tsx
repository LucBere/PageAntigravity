import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginFlow from './components/auth/LoginFlow';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import GestionUsuarios from './components/admin/GestionUsuarios';

const ModificarUsuario = () => <div className="text-white">Modificar Usuario (Próximamente)</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginFlow />} />
        
        {/* Layout anidado para Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* Pantalla 1 */}
          <Route path="usuarios" element={<GestionUsuarios />} /> {/* Pantallas 2 y 3 */}
          <Route path="usuarios/editar" element={<ModificarUsuario />} /> {/* Pantalla 4 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
