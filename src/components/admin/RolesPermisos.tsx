import { Archive, BookOpen, Users, DollarSign, Shield, Settings2 } from 'lucide-react';

const perfiles = [
  { id: 1, type: 'PERFIL ACTIVO', role: 'Administrador/ra', isActive: true },
  { id: 2, type: 'SUCURSAL', role: 'Encargado/da', isActive: false },
  { id: 3, type: 'ADMINISTRATIVO', role: 'Secretario/a', isActive: false },
  { id: 4, type: 'TÉCNICO', role: 'Profesor/a', isActive: false },
  { id: 5, type: 'USUARIO', role: 'Alumno/a', isActive: false },
];

const modulos = [
  { id: 1, title: 'INVENTARIO Y STOCK', desc: 'Gestión de insumos y equipamiento', icon: Archive },
  { id: 2, title: 'CLASES Y RUTINAS', desc: 'Planificación académica y asignación', icon: BookOpen },
  { id: 3, title: 'GESTIÓN DE CLIENTES', desc: 'Altas, bajas y expedientes', icon: Users },
  { id: 4, title: 'FINANZAS Y COBROS', desc: 'Facturación, pagos y reportes', icon: DollarSign },
  { id: 5, title: 'SEGURIDAD Y CONTROL', desc: 'Logs de acceso y configuraciones', icon: Shield },
];

export default function RolesPermisos() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* Encabezado */}
      <div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-3">
          SEGURIDAD Y CONTROL <span className="mx-1">{">"}</span> ROLES Y PERMISOS
        </p>
        <h1 className="text-[3rem] font-black text-[#FAFAFA] tracking-tighter mb-4 uppercase leading-none">
          ROLES Y PERMISOS
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-zinc-400 text-sm max-w-xl">
            Define los niveles de acceso y capacidades operativas para cada perfil dentro del ecosistema SquatGym.
          </p>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3.5 rounded-xl border border-zinc-700 bg-[#0E0E0E] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-900 transition-colors cursor-pointer">
              DESCARGAR LOG
            </button>
            <button className="px-6 py-3.5 rounded-xl bg-[#7B8B9E] hover:bg-slate-400 text-white text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer">
              GUARDAR CAMBIOS
            </button>
          </div>
        </div>
      </div>

      {/* Selector de Perfiles */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {perfiles.map(p => (
          <div 
            key={p.id} 
            className={`min-w-[180px] p-5 rounded-2xl cursor-pointer transition-colors ${
              p.isActive 
                ? 'bg-[#151515] border-l-4 border-l-[#7B8B9E] shadow-lg' 
                : 'bg-[#151515] hover:bg-[#1A1A1A] border-l-4 border-l-transparent'
            }`}
          >
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5">{p.type}</p>
            <p className={`font-medium ${p.isActive ? 'text-white' : 'text-zinc-400'}`}>{p.role}</p>
          </div>
        ))}
      </div>

      {/* Matriz de Permisos */}
      <div className="bg-[#151515] border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 w-1/3">MÓDULO DEL SISTEMA</th>
                <th className="px-4 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-center">VER</th>
                <th className="px-4 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-center">CREAR</th>
                <th className="px-4 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-center">EDITAR</th>
                <th className="px-4 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-center">ELIMINAR</th>
                <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-right">AVANZADO</th>
              </tr>
            </thead>
            <tbody>
              {modulos.map((m) => (
                <tr key={m.id} className="border-b border-zinc-800/30 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-zinc-800/50 flex items-center justify-center text-zinc-400">
                        <m.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#FAFAFA] uppercase tracking-wider mb-0.5">{m.title}</p>
                        <p className="text-[11px] text-zinc-500">{m.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-5 h-5 rounded border border-[#7B8B9E] bg-[#7B8B9E] flex items-center justify-center cursor-pointer">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-5 h-5 rounded border border-[#7B8B9E] bg-[#7B8B9E] flex items-center justify-center cursor-pointer">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-5 h-5 rounded border border-[#7B8B9E] bg-[#7B8B9E] flex items-center justify-center cursor-pointer">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className="flex justify-center">
                      <div className="w-5 h-5 rounded border border-[#7B8B9E] bg-[#7B8B9E] flex items-center justify-center cursor-pointer">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end items-center space-x-2 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                      <span className="text-[9px] font-bold tracking-widest uppercase">CONFIGURACIÓN</span>
                      <Settings2 className="w-4 h-4" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
