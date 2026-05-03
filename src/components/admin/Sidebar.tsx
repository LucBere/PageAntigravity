import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Banknote, ShieldCheck, Settings } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Gestión de usuario', path: '/admin/usuarios', icon: Users },
    { name: 'Comercial y Finanzas', path: '/admin/finanzas', icon: Banknote },
    { name: 'Seguridad y Control', path: '/admin/seguridad', icon: ShieldCheck },
    { name: 'Configuración', path: '/admin/configuracion', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0E0E0E] border-r border-zinc-800 flex flex-col">
      <div className="p-8">
        <h1 className="text-xl font-black tracking-tight text-white mb-1">SQUATGYM</h1>
        <p className="text-[10px] text-zinc-500 tracking-widest font-semibold uppercase">Elite Performance</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-zinc-800/60 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
