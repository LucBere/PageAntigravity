import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CreditCard, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AlertModal from '../components/common/AlertModal';

export default function SocioLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showDevMsg, setShowDevMsg] = useState(false);

  const navItems = [
    { name: 'Inicio', path: '/socio', icon: LayoutDashboard, exact: true },
    { name: 'Pagos', path: '/socio/pagos', icon: CreditCard },
    { name: 'Notificaciones', path: '/socio/notificaciones', icon: Bell },
  ];

  return (
    <div className="flex w-full h-screen bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300 text-slate-800 dark:text-zinc-100 font-sans overflow-hidden">
      <AlertModal
        open={showDevMsg}
        variant="info"
        title="En desarrollo"
        message="El módulo de Ajustes del Sistema está en desarrollo para la fase 2."
        onClose={() => setShowDevMsg(false)}
      />
      {/* Sidebar */}
      <aside className="w-64 h-full bg-slate-50 dark:bg-[#0E0E0E] flex flex-col border-r border-slate-200 dark:border-zinc-800 transition-colors duration-300">
        <div>
          {/* Header */}
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
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                    ? 'bg-slate-200 text-slate-900 dark:bg-zinc-800/60 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/30'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="mt-auto p-4 pb-6 border-t border-slate-200 dark:border-zinc-800 transition-colors duration-300">
          <button
            onClick={() => setShowDevMsg(true)}
            className="flex items-center w-full px-4 py-3 rounded-lg font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer"
          >
            <Settings className="w-5 h-5 mr-3" />
            <span className="text-sm">Ajustes</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center w-full px-4 py-3 rounded-lg font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors mt-1 cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300">
        {/* Topbar */}
        <header className="h-20 px-8 flex justify-end items-center border-b border-slate-200 dark:border-zinc-800/50 shrink-0 bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300">

          <div className="flex items-center gap-4 md:gap-6">
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight whitespace-nowrap transition-colors">Juan Pérez</p>
                <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold tracking-wider uppercase transition-colors">Socio</p>
              </div>
              <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-zinc-700 shrink-0 transition-colors" />
            </div>
          </div>
        </header>

        {/* Outlet Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
