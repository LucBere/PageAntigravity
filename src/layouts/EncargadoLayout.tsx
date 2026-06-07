import { useState, type FormEvent } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import SidebarEncargado from '../components/encargado/SidebarEncargado';

export default function EncargadoLayout() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/buscar?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="flex w-full h-screen bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300 text-slate-800 dark:text-zinc-100 font-sans overflow-hidden">
      
      {/* 1. Sidebar (Left) */}
      <SidebarEncargado />

      {/* 2. Main Content (Header + Outlet) */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300">
        
        {/* Header (Top) */}
        <header className="h-20 px-8 flex justify-between items-center border-b border-slate-200 dark:border-zinc-800/50 shrink-0 bg-white dark:bg-[#151515] transition-colors shadow-sm dark:shadow-none">
          {/* Opcional: Logo si no hay Sidebar, pero ya está en Sidebar. Espacio para breadcrumbs o Search. */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-zinc-500 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar socios, transacciones..."
              className="w-full bg-slate-50 border border-slate-300 dark:bg-[#0E0E0E] dark:border-zinc-800/80 rounded-full py-2.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 dark:text-zinc-200 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors duration-300"
            />
          </form>

          <div className="flex items-center space-x-6 ml-8">
            <div className="flex items-center gap-3 cursor-pointer">
               <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-zinc-700 transition-colors" />
               <div className="hidden sm:block text-left">
                 <p className="text-sm font-semibold text-slate-800 dark:text-white tracking-wide leading-tight">Juan Pérez</p>
                 <p className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">Encargado Sede Centro</p>
               </div>
               <ChevronDown className="w-4 h-4 text-slate-400 dark:text-zinc-500 ml-1" />
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
