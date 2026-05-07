import { Outlet, NavLink } from 'react-router-dom';
import { LayoutGrid, Users, BookOpen, BarChart3, Settings, LogOut } from 'lucide-react';

export default function SecretariaLayout() {
  const navItems = [
    { name: 'Panel de Control', path: '/secretaria', icon: LayoutGrid, exact: true },
    { name: 'Gestión de Socios', path: '/secretaria/socios', icon: Users },
    { name: 'Clases y Reservas', path: '/secretaria/clases', icon: BookOpen },
    { name: 'Reportes Básicos', path: '/secretaria/reportes', icon: BarChart3 },
  ];

  return (
    <div className="flex w-full h-screen bg-[#0E0E0E] text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar Izquierda */}
      <aside className="w-64 bg-[#151515] flex flex-col justify-between border-r border-zinc-800/50">
        <div>
          {/* Header */}
          <div className="p-6">
            <h1 className="text-2xl font-black tracking-tighter text-white">
              SQUAT<span className="text-[#7B8B9E]">GYM</span>
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] mt-1">
              ELITE PERFORMANCE
            </p>
          </div>

          {/* Perfil Secretario */}
          <div className="px-6 mb-6">
            <div className="bg-zinc-800/40 rounded-xl p-4 flex items-center space-x-3 border border-zinc-800/50">
              <div className="w-10 h-10 rounded-full bg-[#7B8B9E] flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">Marcos Rodriguez</p>
                <p className="text-[10px] text-zinc-400 font-bold tracking-wider">SECRETARIO</p>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-zinc-800/50 text-white border-l-4 border-[#7B8B9E]'
                      : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200 border-l-4 border-transparent'
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
        <div className="p-4 border-t border-zinc-800/50">
          <button className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/30">
            <Settings className="w-5 h-5 mr-3 text-zinc-500" />
            Mi Perfil
          </button>
          <button className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/30 mt-1">
            <LogOut className="w-5 h-5 mr-3 text-zinc-500" />
            Salir
          </button>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <main className="flex-1 overflow-y-auto bg-[#0E0E0E] p-8">
        <Outlet />
      </main>
    </div>
  );
}
