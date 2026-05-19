import { NavLink, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function SidebarEncargado() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard (Inicio)', path: '/encargado', icon: LayoutDashboard, exact: true },
    { name: 'Socios (Mora y Pagos)', path: '/encargado/deudores', icon: Users },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-50 border-r border-slate-200 dark:bg-[#0E0E0E] dark:border-zinc-800 flex flex-col transition-colors duration-300">
      
      {/* HEADER: Logo Link y Toggle de Tema */}
      <div className="p-8 flex items-start justify-between">
        <Link to="/encargado" className="cursor-pointer group flex-1">
          <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
            SQUATGYM
          </h1>
        </Link>

        <button 
          onClick={toggleTheme} 
          className="text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer mt-1"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Perfil de Usuario */}
      <div className="px-6 pb-6 mb-2 border-b border-slate-200 dark:border-zinc-800/50">
        <div className="flex items-center space-x-3 cursor-pointer group">
          <img src="https://i.pravatar.cc/150?img=11" alt="Juan Pérez" className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-zinc-700 transition-colors" />
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">JUAN PÉREZ</p>
            <p className="text-[9px] font-bold tracking-wider text-emerald-600 dark:text-emerald-500 uppercase mt-0.5">ENCARGADO SEDE CENTRO</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors" />
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 pt-4 space-y-2 overflow-y-auto scrollbar-hide pb-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 font-bold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/30'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Cerrar Sesión */}
      <div className="mt-auto p-4 pb-6 border-t border-slate-200 dark:border-zinc-800 transition-colors duration-300">
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
