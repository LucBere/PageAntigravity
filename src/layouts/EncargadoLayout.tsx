import { Outlet } from 'react-router-dom';
import { Search, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SidebarEncargado from '../components/encargado/SidebarEncargado';

export default function EncargadoLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex w-full h-screen bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300 text-slate-800 dark:text-zinc-100 font-sans overflow-hidden">
      
      {/* 1. Sidebar (Left) */}
      <SidebarEncargado />

      {/* 2. Main Content (Header + Outlet) */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300">
        
        {/* Header (Top) */}
        <header className="h-20 px-8 flex justify-between items-center border-b border-slate-200 dark:border-zinc-800/50 shrink-0 bg-white dark:bg-[#151515] transition-colors shadow-sm dark:shadow-none">
          {/* Opcional: Logo si no hay Sidebar, pero ya está en Sidebar. Espacio para breadcrumbs o Search. */}
          <div className="flex-1 max-w-xl relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-zinc-500 transition-colors" />
            <input
              type="text"
              placeholder="Buscar socios, transacciones..."
              className="w-full bg-slate-50 border border-slate-300 dark:bg-[#0E0E0E] dark:border-zinc-800/80 rounded-full py-2.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 dark:text-zinc-200 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors duration-300"
            />
          </div>

          <div className="flex items-center space-x-6 ml-8">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#0E0E0E] text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors relative cursor-pointer">
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3 cursor-pointer">
               <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-zinc-700 transition-colors" />
               <ChevronDown className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
}
