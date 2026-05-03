import { Outlet } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-zinc-100 font-sans flex">
      {/* Sidebar Layout */}
      <Sidebar />

      {/* Main Content Layout */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 px-8 flex justify-between items-center border-b border-zinc-800/50 bg-[#0E0E0E]">
          <div className="flex-1 max-w-xl relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar socios, transacciones..."
              className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-full py-2.5 pl-12 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-6 ml-8">
            <button className="text-zinc-400 hover:text-white transition-colors relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></div>
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-bold text-white leading-tight">Melisa</p>
                <p className="text-[10px] text-zinc-500 font-bold tracking-wider">ADMINISTRADOR</p>
              </div>
              <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-10 h-10 rounded-full border-2 border-zinc-700" />
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0E0E0E]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
