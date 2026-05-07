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
import SecretariaLayout from './layouts/SecretariaLayout';
import SecretariaDashboard from './components/secretaria/Dashboard';
import GestionSocios from './components/secretaria/GestionSocios';
import NuevoSocio from './components/secretaria/NuevoSocio';
import RegistroPago from './components/secretaria/RegistroPago';
import Reclamos from './components/secretaria/Reclamos';
import SocioLayout from './layouts/SocioLayout';
import DashboardSocio from './components/socio/DashboardSocio';
import PagosSocio from './components/socio/PagosSocio';
import CheckoutSocio from './components/socio/CheckoutSocio';
import NotificacionesSocio from './components/socio/NotificacionesSocio';

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

        {/* Rutas de Secretaria (Por ahora accesibles para dev) */}
        {/* TODO: Implementar Guard de autenticación por rol aquí */}
        <Route path="/secretaria" element={<SecretariaLayout />}>
          <Route index element={<SecretariaDashboard />} /> {/* Pantalla adjunta */}
          <Route path="socios" element={<GestionSocios />} />
          <Route path="socios/nuevo" element={<NuevoSocio />} />
          <Route path="pago" element={<RegistroPago />} />
          <Route path="reclamos" element={<Reclamos />} />
          {/* Futuras rutas: /secretaria/clases, etc. */}
        </Route>

        {/* Rutas de Socio/Alumno */}
        <Route path="/socio" element={<SocioLayout />}>
          <Route index element={<DashboardSocio />} />
          <Route path="pagos" element={<PagosSocio />} />
          <Route path="checkout" element={<CheckoutSocio />} />
          <Route path="notificaciones" element={<NotificacionesSocio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
