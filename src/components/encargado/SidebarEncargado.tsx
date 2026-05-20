import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Sun, Moon } from 'lucide-react';
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
    { name: 'Dashboard', path: '/encargado', icon: LayoutDashboard, exact: true },
    { name: 'Socios', path: '/encargado/deudores', icon: Users },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-50 border-r border-slate-200 dark:bg-[#0E0E0E] dark:border-zinc-800 flex flex-col transition-colors duration-300">
      
      {/* HEADER: Logo Link y Toggle de Tema */}
      <div className="p-8 flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-1 transition-colors">
            SQUATGYM
          </h1>
        </div>

        <button 
          onClick={toggleTheme} 
          className="text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer mt-1"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>



      {/* Navegación */}
      <nav className="flex-1 px-4 pt-4 space-y-2 overflow-y-auto scrollbar-hide pb-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-slate-200 text-slate-800 font-semibold dark:bg-zinc-800/40 dark:text-white border-l-[3px] border-[#7B8B9E]'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800/20 border-l-[3px] border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-[#7B8B9E]' : 'text-slate-500 dark:text-zinc-500'
                  }`}
                />
                <span className="text-sm">{item.name}</span>
              </>
            )}
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
