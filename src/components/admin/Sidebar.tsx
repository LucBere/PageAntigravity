import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Banknote, ShieldCheck, Settings, ChevronDown, ChevronUp, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Sidebar() {
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Consumiendo el contexto global del tema
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (location.pathname.includes('/admin/seguridad')) {
      setIsSecurityOpen(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // Limpiar cualquier estado de autenticación simulado
    localStorage.clear();
    sessionStorage.clear();
    // Redirigir al login
    navigate('/login');
  };



  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Gestión de usuario', path: '/admin/usuarios', icon: Users },
    { name: 'Comercial y Finanzas', path: '/admin/finanzas', icon: Banknote },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-50 border-r border-slate-200 dark:bg-[#0E0E0E] dark:border-zinc-800 flex flex-col transition-colors duration-300">
      
      {/* HEADER: Logo Link y Toggle de Tema */}
      <div className="p-8 flex items-start justify-between">
        <Link to="/dashboard" className="cursor-pointer group flex-1">
          <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-1 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors">
            SQUATGYM
          </h1>
          <p className="text-[10px] text-slate-500 dark:text-zinc-500 tracking-widest font-semibold uppercase">
            Elite Performance
          </p>
        </Link>

        <button 
          onClick={toggleTheme} 
          className="text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer mt-1"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
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
                  ? 'bg-slate-200 text-slate-900 dark:bg-zinc-800/60 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/30'
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
                ? 'bg-slate-200 text-slate-900 dark:bg-zinc-800/60 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/30'
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
                    isActive 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-300'
                  }`
                }
              >
                Roles y Permisos
              </NavLink>
              <NavLink
                to="/admin/seguridad/auditoria"
                className={({ isActive }) =>
                  `block py-2 text-[12px] font-medium transition-colors ${
                    isActive 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-300'
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
              isActive 
                ? 'bg-slate-200 text-slate-900 dark:bg-zinc-800/60 dark:text-white' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/30'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Configuración</span>
        </NavLink>
      </nav>

      {/* Cerrar Sesión */}
      <div className="mt-auto p-4 border-t border-slate-200 dark:border-zinc-800 transition-colors duration-300">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
