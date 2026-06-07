import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#0E0E0E] dark:text-zinc-100 font-sans flex transition-colors duration-300">
      {/* Sidebar Layout */}
      <Sidebar />

      {/* Main Content Layout */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 px-8 flex justify-end items-center border-b border-slate-200 bg-slate-50 dark:border-zinc-800/50 dark:bg-[#0E0E0E] transition-colors duration-300">
          <div className="flex items-center space-x-6">
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
