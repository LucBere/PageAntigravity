import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, Users, AlertTriangle, Settings, LogOut, Sun, Moon, Search, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function SecretariaLayout() {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { name: 'Dashboard', path: '/secretaria', icon: LayoutGrid, exact: true },
    { name: 'Socios', path: '/secretaria/socios', icon: Users },
    { name: 'Reclamos', path: '/secretaria/reclamos', icon: AlertTriangle },
  ];

  return (
    <div className="flex w-full h-screen bg-slate-50 dark:bg-[#0E0E0E] text-slate-900 dark:text-zinc-100 font-sans overflow-hidden transition-colors duration-300">
      {/* Sidebar Izquierda */}
      <aside className="w-64 bg-slate-50 dark:bg-[#151515] flex flex-col justify-between border-r border-slate-200 dark:border-zinc-800/50 transition-colors duration-300">
        <div>
          {/* Header Sidebar */}
          <div className="p-6 mb-4 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
                SQUATGYM
              </h1>
              <p className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 tracking-[0.1em] mt-1 uppercase">
                SECRETARÍA CENTRAL
              </p>
            </div>
            <button 
              onClick={toggleTheme} 
              className="text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer mt-1"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
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
                      ? 'bg-slate-200 text-slate-900 dark:bg-zinc-800/40 dark:text-white border-l-[3px] border-[#7B8B9E]'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800/20 border-l-[3px] border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 mr-3 transition-colors ${
                        isActive ? 'text-[#7B8B9E]' : 'text-slate-500 dark:text-zinc-500'
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
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800/20 transition-colors rounded-xl cursor-pointer"
          >
            <Settings className="w-5 h-5 mr-3" />
            Configuración
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800/20 transition-colors rounded-xl mt-1 cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenedor Principal con Header Global */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300">
        
        {/* Header Global */}
        <header className="h-20 px-8 flex justify-between items-center border-b border-slate-200 dark:border-zinc-800/50 shrink-0 bg-slate-50 dark:bg-[#0E0E0E]">
          
          {/* Izquierda: Espacio vacío para que el título de la página tome el protagonismo */}
          <div className="flex-1"></div>
          
          {/* Centro/Derecha: Controles */}
          <div className="flex items-center space-x-6">
            {/* Barra de Búsqueda Global */}
            <div className="relative w-80 hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
              </div>
              <input 
                type="text" 
                placeholder="Buscar por nombre, DNI o comprobante..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#1A1A1A] text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7B8B9E] transition-colors shadow-sm dark:shadow-none"
              />
            </div>

            <button className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:text-white transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-zinc-800/50 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Alicia Rossi</p>
                <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold">SECRETARÍA</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden border border-slate-300 dark:border-zinc-700">
                {/* Simulación de Avatar de Alicia Rossi */}
                <img src="https://i.pravatar.cc/150?u=alicia" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Área de Contenido Dinámico */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
