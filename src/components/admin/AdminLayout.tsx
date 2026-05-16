import { Outlet } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#0E0E0E] dark:text-zinc-100 font-sans flex transition-colors duration-300">
      {/* Sidebar Layout */}
      <Sidebar />

      {/* Main Content Layout */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 px-8 flex justify-between items-center border-b border-slate-200 bg-slate-50 dark:border-zinc-800/50 dark:bg-[#0E0E0E] transition-colors duration-300">
          <div className="flex-1 max-w-xl relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-zinc-500 transition-colors" />
            <input
              type="text"
              placeholder="Buscar socios, transacciones..."
              className="w-full bg-white border border-slate-300 dark:bg-zinc-900/50 dark:border-zinc-800/50 rounded-full py-2.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 dark:text-zinc-200 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors duration-300 shadow-sm dark:shadow-none"
            />
          </div>

          <div className="flex items-center space-x-6 ml-8">
            <button className="text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white transition-colors relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-slate-800 dark:bg-white rounded-full transition-colors"></div>
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight transition-colors">Melisa</p>
                <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold tracking-wider transition-colors">ADMINISTRADOR</p>
              </div>
              <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-zinc-700 transition-colors" />
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
