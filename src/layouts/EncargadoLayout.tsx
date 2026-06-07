import { Outlet } from 'react-router-dom';
import SidebarEncargado from '../components/encargado/SidebarEncargado';

export default function EncargadoLayout() {
  return (
    <div className="flex w-full h-screen bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300 text-slate-800 dark:text-zinc-100 font-sans overflow-hidden">
      
      {/* 1. Sidebar (Left) */}
      <SidebarEncargado />

      {/* 2. Main Content (Header + Outlet) */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300">
        
        {/* Header (Top) */}
        <header className="h-20 px-8 flex justify-end items-center border-b border-slate-200 dark:border-zinc-800/50 shrink-0 bg-white dark:bg-[#151515] transition-colors shadow-sm dark:shadow-none">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-3">
               <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-zinc-700 transition-colors" />
               <div className="hidden sm:block text-left">
                 <p className="text-sm font-semibold text-slate-800 dark:text-white tracking-wide leading-tight">Juan Pérez</p>
                 <p className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">Encargado Sede Centro</p>
               </div>
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
