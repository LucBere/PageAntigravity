import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, CreditCard, Bell, Settings, LogOut, Search } from 'lucide-react';

export default function SocioLayout() {
  const navItems = [
    { name: 'INICIO', path: '/socio', icon: LayoutDashboard, exact: true },
    { name: 'PAGOS', path: '/socio/pagos', icon: CreditCard },
    { name: 'NOTIFICACIONES', path: '/socio/notificaciones', icon: Bell },
  ];

  return (
    <div className="flex w-full h-screen bg-[#0E0E0E] text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#151515] flex flex-col justify-between border-r border-zinc-800/50">
        <div>
          {/* Header */}
          <div className="p-8">
            <h1 className="text-2xl font-black tracking-tighter text-white">
              SQUAT<span className="text-[#7B8B9E]">GYM</span>
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] mt-1">
              ELITE PERFORMANCE
            </p>
          </div>

          {/* Navegación */}
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-sm font-bold tracking-widest transition-all duration-200 group ${
                    isActive
                      ? 'bg-zinc-800/50 text-white border-l-[3px] border-[#7B8B9E]'
                      : 'text-zinc-500 hover:bg-zinc-800/30 hover:text-zinc-300 border-l-[3px] border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 mr-3 transition-colors ${
                        isActive ? 'text-[#7B8B9E]' : 'text-zinc-500 group-hover:text-zinc-400'
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
        <div>
          {/* Mini perfil */}
          <div className="px-6 mb-6">
            <div className="flex items-center space-x-3">
              <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-10 h-10 rounded-full border border-zinc-700" />
              <div>
                <p className="text-[10px] text-[#7B8B9E] font-bold uppercase tracking-wider">ELITE MEMBER</p>
                <p className="text-xs text-white font-bold">ACTIVE MOMENTUM</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-zinc-800/50">
            <button className="flex items-center w-full px-4 py-2 text-sm font-bold tracking-widest text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/30">
              <Settings className="w-4 h-4 mr-3" />
              AJUSTES
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm font-bold tracking-widest text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/30 mt-1">
              <LogOut className="w-4 h-4 mr-3" />
              CERRAR SESIÓN
            </button>
          </div>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0E0E0E]">
        {/* Topbar */}
        <header className="h-20 px-8 flex justify-between items-center border-b border-zinc-800/50 shrink-0">
          <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">PANEL DE CONTROL</h2>
          
          <div className="flex items-center space-x-6">
            {/* Buscador */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="BUSCAR ENTRENAMIENTO..."
                className="w-64 bg-[#151515] border border-zinc-800/80 rounded-full py-2.5 pl-11 pr-4 text-xs font-bold tracking-wider text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
            
            {/* Notificaciones */}
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#0E0E0E]"></div>
              <Bell className="w-5 h-5" />
            </button>
            
            {/* Perfil Header */}
            <div className="flex items-center space-x-3 pl-6 border-l border-zinc-800/80">
              <span className="text-sm font-bold text-white uppercase tracking-wider">JUAN PÉREZ</span>
              <img src="https://i.pravatar.cc/150?img=11" alt="Perfil" className="w-9 h-9 rounded-full border border-zinc-700" />
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
