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
    { name: 'INICIO', path: '/socio', icon: LayoutDashboard, exact: true },
    { name: 'PAGOS', path: '/socio/pagos', icon: CreditCard },
    { name: 'NOTIFICACIONES', path: '/socio/notificaciones', icon: Bell },
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
      <aside className="w-64 h-full bg-white dark:bg-[#151515] flex flex-col border-r border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
        <div>
          {/* Header */}
          <div className="p-8">
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              SQUAT<span className="text-[#7B8B9E]">GYM</span>
            </h1>
          </div>

          {/* Navegación */}
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-sm font-bold tracking-widest transition-all duration-200 group ${isActive
                    ? 'bg-slate-100 dark:bg-zinc-800/50 text-slate-900 dark:text-white border-l-[3px] border-[#7B8B9E]'
                    : 'text-slate-500 hover:text-slate-600 hover:bg-slate-50 dark:text-zinc-500 dark:hover:bg-zinc-800/30 dark:hover:text-zinc-300 border-l-[3px] border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-[#7B8B9E]' : 'text-slate-500 group-hover:text-slate-600 dark:text-zinc-500 dark:group-hover:text-zinc-400'
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
        <div className="mt-auto pb-6">
          <div className="p-4 border-t border-slate-200 dark:border-zinc-800/50">
            <button
              onClick={() => setShowDevMsg(true)}
              className="flex items-center w-full px-4 py-2 text-sm font-bold tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800/30 transition-colors rounded-lg cursor-pointer"
            >
              <Settings className="w-4 h-4 mr-3" />
              AJUSTES
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center w-full px-4 py-2 text-sm font-bold tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800/30 transition-colors rounded-lg mt-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-3" />
              CERRAR SESIÓN
            </button>
          </div>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300">
        {/* Topbar */}
        <header className="h-20 px-8 flex justify-end items-center border-b border-slate-200 dark:border-zinc-800/50 shrink-0">

          <div className="flex items-center gap-4 md:gap-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#151515] text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer shadow-sm dark:shadow-none shrink-0"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Separador */}
            <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-zinc-800/80"></div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-10 h-10 rounded-full border border-slate-300 dark:border-zinc-700 shrink-0" />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-800 dark:text-white tracking-wide whitespace-nowrap">Juan Pérez</p>
              </div>
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
