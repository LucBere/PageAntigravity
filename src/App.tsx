import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginFlow from './components/auth/LoginFlow';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import GestionUsuarios from './components/admin/GestionUsuarios';
import NuevoUsuario from './components/admin/NuevoUsuario';
import ModificarUsuario from './components/admin/ModificarUsuario';
import CajaPagos from './components/admin/CajaPagos';
import ClientesMora from './components/admin/ClientesMora';
import EstadosPago from './components/admin/EstadosPago';
import RolesPermisos from './components/admin/RolesPermisos';
import AuditoriaLogs from './components/admin/AuditoriaLogs';
import Configuracion from './components/admin/Configuracion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginFlow />} />
        
        {/* Layout anidado para Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* Pantalla 1 */}
          <Route path="usuarios" element={<GestionUsuarios />} /> {/* Pantallas 2 y 3 */}
          <Route path="usuarios/nuevo" element={<NuevoUsuario />} /> {/* Nueva Pantalla */}
          <Route path="usuarios/editar" element={<ModificarUsuario />} /> {/* Pantalla 4 */}
          <Route path="finanzas" element={<CajaPagos />} />
          <Route path="finanzas/mora" element={<ClientesMora />} />
          <Route path="finanzas/pagos" element={<EstadosPago />} />
          <Route path="seguridad/roles" element={<RolesPermisos />} />
          <Route path="seguridad/auditoria" element={<AuditoriaLogs />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
