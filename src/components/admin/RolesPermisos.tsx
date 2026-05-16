import { useState } from 'react';
import { Archive, BookOpen, Users, DollarSign, Shield, Settings2 } from 'lucide-react';

type Rol = 'admin' | 'encargado' | 'secretario' | 'profesor' | 'alumno';
type Modulo = 'inventario' | 'clases' | 'clientes' | 'finanzas' | 'seguridad';
type Accion = 'ver' | 'crear' | 'editar' | 'eliminar';

const perfiles: { id: number, roleKey: Rol, type: string, role: string }[] = [
  { id: 1, roleKey: 'admin', type: 'PERFIL ACTIVO', role: 'Administrador/ra' },
  { id: 2, roleKey: 'encargado', type: 'SUCURSAL', role: 'Encargado/da' },
  { id: 3, roleKey: 'secretario', type: 'ADMINISTRATIVO', role: 'Secretario/a' },
  { id: 4, roleKey: 'profesor', type: 'TÉCNICO', role: 'Profesor/a' },
  { id: 5, roleKey: 'alumno', type: 'USUARIO', role: 'Alumno/a' },
];

const modulos: { id: number, key: Modulo, title: string, desc: string, icon: any }[] = [
  { id: 1, key: 'inventario', title: 'INVENTARIO Y STOCK', desc: 'Gestión de insumos y equipamiento', icon: Archive },
  { id: 2, key: 'clases', title: 'CLASES Y RUTINAS', desc: 'Planificación académica y asignación', icon: BookOpen },
  { id: 3, key: 'clientes', title: 'GESTIÓN DE CLIENTES', desc: 'Altas, bajas y expedientes', icon: Users },
  { id: 4, key: 'finanzas', title: 'FINANZAS Y COBROS', desc: 'Facturación, pagos y reportes', icon: DollarSign },
  { id: 5, key: 'seguridad', title: 'SEGURIDAD Y CONTROL', desc: 'Logs de acceso y configuraciones', icon: Shield },
];

const defaultPermisos: Record<Rol, Record<Modulo, Record<Accion, boolean>>> = {
  admin: {
    inventario: { ver: true, crear: true, editar: true, eliminar: true },
    clases: { ver: true, crear: true, editar: true, eliminar: true },
    clientes: { ver: true, crear: true, editar: true, eliminar: true },
    finanzas: { ver: true, crear: true, editar: true, eliminar: true },
    seguridad: { ver: true, crear: true, editar: true, eliminar: true },
  },
  encargado: {
    inventario: { ver: true, crear: true, editar: true, eliminar: false },
    clases: { ver: true, crear: true, editar: true, eliminar: false },
    clientes: { ver: true, crear: true, editar: true, eliminar: false },
    finanzas: { ver: true, crear: false, editar: false, eliminar: false },
    seguridad: { ver: false, crear: false, editar: false, eliminar: false },
  },
  secretario: {
    inventario: { ver: false, crear: false, editar: false, eliminar: false },
    clases: { ver: false, crear: false, editar: false, eliminar: false },
    clientes: { ver: true, crear: true, editar: true, eliminar: false },
    finanzas: { ver: true, crear: true, editar: false, eliminar: false },
    seguridad: { ver: false, crear: false, editar: false, eliminar: false },
  },
  profesor: {
    inventario: { ver: false, crear: false, editar: false, eliminar: false },
    clases: { ver: true, crear: false, editar: true, eliminar: false },
    clientes: { ver: true, crear: false, editar: false, eliminar: false },
    finanzas: { ver: false, crear: false, editar: false, eliminar: false },
    seguridad: { ver: false, crear: false, editar: false, eliminar: false },
  },
  alumno: {
    inventario: { ver: false, crear: false, editar: false, eliminar: false },
    clases: { ver: true, crear: false, editar: false, eliminar: false },
    clientes: { ver: false, crear: false, editar: false, eliminar: false },
    finanzas: { ver: false, crear: false, editar: false, eliminar: false },
    seguridad: { ver: false, crear: false, editar: false, eliminar: false },
  }
};

export default function RolesPermisos() {
  const [rolActivo, setRolActivo] = useState<Rol>('admin');
  const [permisos, setPermisos] = useState(defaultPermisos);

  const handleTogglePermiso = (modulo: Modulo, accion: Accion) => {
    setPermisos(prev => {
      const rolPermisos = { ...prev[rolActivo] };
      const modPermisos = { ...rolPermisos[modulo] };
      
      const newValue = !modPermisos[accion];
      modPermisos[accion] = newValue;

      if (accion === 'ver' && !newValue) {
        // Si el usuario desmarca ver, desmarcar crear, editar y eliminar automáticamente
        modPermisos.crear = false;
        modPermisos.editar = false;
        modPermisos.eliminar = false;
      } else if (['crear', 'editar', 'eliminar'].includes(accion) && newValue) {
        // Si el usuario marca crear, editar o eliminar, automáticamente poner ver en true
        modPermisos.ver = true;
      }

      return {
        ...prev,
        [rolActivo]: {
          ...rolPermisos,
          [modulo]: modPermisos
        }
      };
    });
  };

  const handleGuardarCambios = () => {
    setTimeout(() => {
      alert("¡Matriz de permisos guardada exitosamente!");
    }, 300);
  };

  const handleDescargarLog = () => {
    alert("Generando archivo de auditoría...");
  };

  const renderCheckbox = (modulo: Modulo, accion: Accion) => {
    const isChecked = permisos[rolActivo][modulo][accion];
    
    return (
      <div className="flex justify-center">
        <input 
          type="checkbox"
          checked={isChecked}
          onChange={() => handleTogglePermiso(modulo, accion)}
          className="squat-checkbox"
        />
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* Encabezado */}
      <div>
        <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-3">
          SEGURIDAD Y CONTROL <span className="mx-1">{">"}</span> ROLES Y PERMISOS
        </p>
        <h1 className="text-[3rem] font-black text-slate-900 dark:text-[#FAFAFA] tracking-tighter mb-4 uppercase leading-none transition-colors">
          ROLES Y PERMISOS
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-xl">
            Define los niveles de acceso y capacidades operativas para cada perfil dentro del ecosistema SquatGym.
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleDescargarLog}
              className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-[#0E0E0E] text-slate-900 dark:text-white text-[11px] font-bold uppercase tracking-widest hover:bg-slate-200 dark:bg-zinc-900 transition-colors cursor-pointer"
            >
              DESCARGAR LOG
            </button>
            <button 
              onClick={handleGuardarCambios}
              className="px-6 py-3.5 rounded-xl bg-slate-800 dark:bg-[#7B8B9E] hover:bg-slate-700 dark:hover:bg-slate-400 text-white text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              GUARDAR CAMBIOS
            </button>
          </div>
        </div>
      </div>

      {/* Selector de Perfiles */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {perfiles.map(p => {
          const isActive = rolActivo === p.roleKey;
          return (
            <div 
              key={p.id} 
              onClick={() => setRolActivo(p.roleKey)}
              className={`min-w-[180px] p-5 rounded-2xl cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-white dark:bg-[#151515] border-l-4 border-l-[#7B8B9E] shadow-lg opacity-100' 
                  : 'bg-white dark:bg-[#151515] hover:bg-slate-50 dark:bg-[#1A1A1A] border-l-4 border-l-transparent opacity-60'
              }`}
            >
              <p className="text-[9px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest mb-1.5">{p.type}</p>
              <p className={`font-medium ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-zinc-400'}`}>{p.role}</p>
            </div>
          );
        })}
      </div>

      {/* Matriz de Permisos */}
      <div className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-colors shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 w-1/3">MÓDULO DEL SISTEMA</th>
                <th className="px-4 py-6 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 text-center">VER</th>
                <th className="px-4 py-6 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 text-center">CREAR</th>
                <th className="px-4 py-6 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 text-center">EDITAR</th>
                <th className="px-4 py-6 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 text-center">ELIMINAR</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 text-right">AVANZADO</th>
              </tr>
            </thead>
            <tbody>
              {modulos.map((m) => (
                <tr key={m.id} className="border-b border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 last:border-0 hover:bg-slate-50 dark:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 flex items-center justify-center text-slate-500 dark:text-zinc-400">
                        <m.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-[#FAFAFA] uppercase tracking-wider mb-0.5 transition-colors">{m.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-500">{m.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    {renderCheckbox(m.key, 'ver')}
                  </td>
                  <td className="px-4 py-5 text-center">
                    {renderCheckbox(m.key, 'crear')}
                  </td>
                  <td className="px-4 py-5 text-center">
                    {renderCheckbox(m.key, 'editar')}
                  </td>
                  <td className="px-4 py-5 text-center">
                    {renderCheckbox(m.key, 'eliminar')}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end items-center space-x-2 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:text-white transition-colors cursor-pointer">
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
