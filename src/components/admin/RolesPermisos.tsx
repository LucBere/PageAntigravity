import { useState } from 'react';
import { Archive, BookOpen, Users, DollarSign, Shield, Lock, Pencil, AlertTriangle, X } from 'lucide-react';
import AlertModal from '../common/AlertModal';

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
  const [modoEdicion, setModoEdicion] = useState(false);
  const [backupPermisos, setBackupPermisos] = useState(defaultPermisos);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);


  const handleTogglePermiso = (modulo: Modulo, accion: Accion) => {
    if (!modoEdicion) return; // En modo lectura no se puede modificar
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

  // Entrar en modo edición: guardamos una copia de respaldo para poder cancelar
  const handleActivarEdicion = () => {
    setBackupPermisos(permisos);
    setModoEdicion(true);
  };

  // Cancelar: descartamos los cambios y volvemos al estado guardado
  const handleCancelarEdicion = () => {
    setPermisos(backupPermisos);
    setModoEdicion(false);
  };

  // El botón "Guardar" solo abre el modal de confirmación
  const handleSolicitarGuardado = () => {
    setMostrarConfirmacion(true);
  };

  // Confirmar guardado desde el modal
  const handleConfirmarGuardado = () => {
    setBackupPermisos(permisos);
    setMostrarConfirmacion(false);
    setModoEdicion(false);
    setMostrarExito(true);
  };



  const renderCheckbox = (modulo: Modulo, accion: Accion) => {
    const isChecked = permisos[rolActivo][modulo][accion];

    return (
      <div className="flex justify-center">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={!modoEdicion}
          onChange={() => handleTogglePermiso(modulo, accion)}
          className={`squat-checkbox ${!modoEdicion ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        />
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* Encabezado */}
      <div>

        <h1 className="text-[3rem] font-black text-slate-900 dark:text-[#FAFAFA] tracking-tighter mb-4 uppercase leading-none transition-colors">
          ROLES Y PERMISOS
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-xl">
            Define los niveles de acceso y capacidades operativas para cada perfil dentro del ecosistema SquatGym.
          </p>
          <div className="flex items-center gap-3">
            {/* Indicador de estado de la pantalla */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
              modoEdicion
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/50'
                : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-800'
            }`}>
              {modoEdicion ? <Pencil className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              {modoEdicion ? 'Modo edición' : 'Modo lectura'}
            </span>

            {!modoEdicion ? (
              <button
                onClick={handleActivarEdicion}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 dark:bg-[#7B8B9E] hover:bg-slate-700 dark:hover:bg-slate-400 text-white text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                EDITAR PERMISOS
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelarEdicion}
                  className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  CANCELAR
                </button>
                <button
                  onClick={handleSolicitarGuardado}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 dark:bg-[#7B8B9E] hover:bg-slate-700 dark:hover:bg-slate-400 text-white text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  GUARDAR CAMBIOS
                </button>
              </>
            )}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Confirmación de Guardado */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl transition-colors relative">
            <button
              onClick={() => setMostrarConfirmacion(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-5">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>

            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              ¿Guardar cambios?
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-8 leading-relaxed">
              Estás por modificar los permisos del perfil <strong className="text-slate-900 dark:text-white">{perfiles.find(p => p.roleKey === rolActivo)?.role}</strong>. Esta acción cambia los niveles de acceso al sistema. ¿Estás seguro que deseas guardar los cambios?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="flex-1 py-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                CANCELAR
              </button>
              <button
                onClick={handleConfirmarGuardado}
                className="flex-1 py-3.5 rounded-xl bg-slate-800 dark:bg-[#7B8B9E] hover:bg-slate-700 dark:hover:bg-slate-400 text-white text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                SÍ, GUARDAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      <AlertModal
        open={mostrarExito}
        variant="success"
        title="Permisos guardados"
        message="La matriz de permisos se guardó exitosamente."
        onClose={() => setMostrarExito(false)}
      />

    </div>
  );
}
