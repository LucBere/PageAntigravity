import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Banknote, ShieldCheck, Settings, ChevronDown, ChevronUp } from 'lucide-react';

export default function Sidebar() {
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/admin/seguridad')) {
      setIsSecurityOpen(true);
    }
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Gestión de usuario', path: '/admin/usuarios', icon: Users },
    { name: 'Comercial y Finanzas', path: '/admin/finanzas', icon: Banknote },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0E0E0E] border-r border-zinc-800 flex flex-col">
      <div className="p-8">
        <h1 className="text-xl font-black tracking-tight text-white mb-1">SQUATGYM</h1>
        <p className="text-[10px] text-zinc-500 tracking-widest font-semibold uppercase">Elite Performance</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-hide pb-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-zinc-800/60 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}

        {/* Seguridad y Control (Accordion) */}
        <div>
          <button
            onClick={() => setIsSecurityOpen(!isSecurityOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
              location.pathname.includes('/admin/seguridad') || isSecurityOpen
                ? 'bg-zinc-800/60 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm">Seguridad y Control</span>
            </div>
            {isSecurityOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isSecurityOpen && (
            <div className="mt-2 space-y-1 pl-12 pr-4">
              <NavLink
                to="/admin/seguridad/roles"
                className={({ isActive }) =>
                  `block py-2 text-[12px] font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`
                }
              >
                Roles y Permisos
              </NavLink>
              <NavLink
                to="/admin/seguridad/auditoria"
                className={({ isActive }) =>
                  `block py-2 text-[12px] font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`
                }
              >
                Auditoría (Logs)
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/admin/configuracion"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive ? 'bg-zinc-800/60 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Configuración</span>
        </NavLink>
      </nav>
    </aside>
  );
}
