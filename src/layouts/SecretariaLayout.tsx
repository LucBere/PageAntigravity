import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, Users, AlertTriangle, Settings, LogOut } from 'lucide-react';

export default function SecretariaLayout() {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/secretaria', icon: LayoutGrid, exact: true },
    { name: 'Socios', path: '/secretaria/socios', icon: Users },
    { name: 'Reclamos', path: '/secretaria/reclamos', icon: AlertTriangle },
  ];

  return (
    <div className="flex w-full h-screen bg-[#0E0E0E] text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar Izquierda */}
      <aside className="w-64 bg-[#151515] flex flex-col justify-between border-r border-zinc-800/50">
        <div>
          {/* Header */}
          <div className="p-6 mb-4">
            <h1 className="text-xl font-bold tracking-tight text-white">
              SQUATGYM
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.1em] mt-1 uppercase">
              SECRETARÍA CENTRAL
            </p>
          </div>

          {/* Navegación Superior */}
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-800/40 text-white border-l-[3px] border-[#7B8B9E]'
                      : 'text-zinc-500 hover:text-zinc-300 border-l-[3px] border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 mr-3 transition-colors ${
                        isActive ? 'text-[#7B8B9E]' : 'text-zinc-500'
                      }`}
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="p-4 mb-4">
          <button 
            onClick={() => alert('Módulo de Ajustes del Sistema en desarrollo para la fase 2.')}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors rounded-xl cursor-pointer"
          >
            <Settings className="w-5 h-5 mr-3 text-zinc-500" />
            Configuración
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors rounded-xl mt-1 cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3 text-zinc-500" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <main className="flex-1 overflow-y-auto bg-[#0E0E0E]">
        <Outlet />
      </main>
    </div>
  );
}
