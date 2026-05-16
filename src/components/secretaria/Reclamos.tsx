import { useState } from 'react';
import { Image, ClipboardList, Timer, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

type Reclamo = {
  id: number;
  date: string;
  time: string;
  name: string;
  email: string;
  dni: string;
  avatar: string;
};

export default function Reclamos() {
  const [reclamos, setReclamos] = useState<Reclamo[]>([
    { id: 1, date: '24 OCT 2023', time: '14:32 PM', name: 'MARCOS G. VILLALBA', email: 'marcos.v@email.com', dni: '38.442.109', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, date: '23 OCT 2023', time: '09:15 AM', name: 'CARLA MENDEZ', email: 'carla.m88@email.com', dni: '42.115.903', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, date: '22 OCT 2023', time: '18:45 PM', name: 'JULIÁN PEREZ', email: 'j.perez.coach@email.com', dni: '35.667.112', avatar: 'https://i.pravatar.cc/150?img=12' },
  ]);

  const [reclamoSeleccionado, setReclamoSeleccionado] = useState<Reclamo | null>(null);

  const handleVerificar = (reclamo: Reclamo) => {
    setReclamoSeleccionado(reclamo);
  };

  const resolverReclamo = (id: number) => {
    setReclamos(prev => prev.filter(r => r.id !== id));
    setReclamoSeleccionado(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-8 pt-12 pb-12 min-h-full bg-slate-50 dark:bg-[#0E0E0E] relative">
      {/* 1. Encabezado */}
      <div>
        <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-2">RECLAMOS</p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-[#FAFAFA] tracking-tighter uppercase transition-colors">RECLAMOS DE PAGO</h1>
      </div>

      {/* 2. Tabla Principal */}
      <div className="bg-white dark:bg-[#151515] rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 p-6 transition-colors shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800/80 text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
                <th className="pb-4 font-bold">FECHA DE CARGA</th>
                <th className="pb-4 font-bold">SOCIO</th>
                <th className="pb-4 font-bold">DNI / ID</th>
                <th className="pb-4 font-bold text-center">COMPROBANTE</th>
                <th className="pb-4 font-bold text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {reclamos.length > 0 ? (
                reclamos.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-100 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="py-4">
                      <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{r.date}</p>
                      <p className="text-xs text-slate-500 dark:text-zinc-500">{r.time}</p>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover grayscale opacity-80 border border-slate-300 dark:border-zinc-700" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{r.name}</p>
                          <p className="text-xs text-slate-500 dark:text-zinc-500">{r.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-slate-900 dark:text-white">{r.dni}</span>
                    </td>
                    <td className="py-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800">
                        <Image className="w-5 h-5 text-slate-500 dark:text-zinc-500" />
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => handleVerificar(r)}
                        className="px-6 py-2 bg-slate-500/20 hover:bg-slate-500/40 text-slate-300 text-xs font-bold rounded-full transition-colors cursor-pointer"
                      >
                        VERIFICAR
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 dark:text-zinc-500 text-sm font-bold uppercase tracking-widest">
                    No hay reclamos pendientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Tabla */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-6 mt-2 border-t border-slate-200 dark:border-slate-200 dark:border-zinc-800/50">
          <p className="text-[11px] text-slate-500 dark:text-zinc-500 font-bold tracking-widest uppercase">
            MOSTRANDO {reclamos.length} DE {reclamos.length} RECLAMOS PENDIENTES
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button className="p-2 rounded-lg bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:text-white transition-colors cursor-pointer disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent border border-[#7B8B9E] text-[#7B8B9E] font-bold text-xs cursor-pointer">
              1
            </button>
            <button className="p-2 rounded-lg bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:text-white transition-colors cursor-pointer disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Tarjetas KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        {/* Tarjeta 1 (Pendientes) */}
        <div className="bg-white dark:bg-[#151515] rounded-xl p-6 border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 border-l-2 border-l-red-500 relative overflow-hidden transition-all transition-colors shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">PENDIENTES HOY</h3>
            <ClipboardList className="w-5 h-5 text-red-600 dark:text-red-500" />
          </div>
          <p className="text-5xl font-normal text-slate-900 dark:text-white mb-2 tracking-tight">
            {reclamos.length.toString().padStart(2, '0')}
          </p>
          <p className="text-[10px] font-bold text-red-600 dark:text-red-500 uppercase tracking-widest">
            {reclamos.length > 0 ? 'SE REQUIERE ACCIÓN' : 'TODO AL DÍA'}
          </p>
        </div>

        {/* Tarjeta 2 (Tiempo) */}
        <div className="bg-white dark:bg-[#151515] rounded-xl p-6 border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 relative overflow-hidden transition-colors shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">TIEMPO RESPUESTA</h3>
            <Timer className="w-5 h-5 text-slate-500 dark:text-zinc-500" />
          </div>
          <p className="text-5xl font-normal text-slate-900 dark:text-white mb-2 tracking-tight">14m</p>
          <p className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
            PROMEDIO DE GESTIÓN ACTIVA
          </p>
        </div>

        {/* Tarjeta 3 (Resueltos) */}
        <div className="bg-white dark:bg-[#151515] rounded-xl p-6 border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 relative overflow-hidden transition-colors shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">RESUELTOS SEMANA</h3>
            <CheckCircle2 className="w-5 h-5 text-slate-500 dark:text-zinc-500" />
          </div>
          <p className="text-5xl font-normal text-slate-900 dark:text-white mb-2 tracking-tight">142</p>
          <p className="text-[10px] font-bold text-[#7B8B9E] uppercase tracking-widest">
            92% EFECTIVIDAD DE COBRO
          </p>
        </div>

      </div>

      {/* Modal de Verificación */}
      {reclamoSeleccionado && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl shadow-black transition-colors shadow-sm dark:shadow-none">
            
            <div className="mb-6 text-center">
              <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-2">VERIFICACIÓN DE COMPROBANTE</p>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{reclamoSeleccionado.name}</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">DNI: {reclamoSeleccionado.dni}</p>
            </div>

            {/* Placeholder de la Imagen del Comprobante */}
            <div className="w-full h-64 bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 rounded-xl mb-8 flex flex-col items-center justify-center text-slate-500 dark:text-zinc-500 overflow-hidden relative">
              {/* Overlay sutil para simular una imagen escaneada o foto */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent"></div>
              
              <Image className="w-12 h-12 mb-3 opacity-40" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-600">Comprobante_Transferencia.jpg</p>
              <p className="text-[10px] text-zinc-700 mt-2">Fecha: {reclamoSeleccionado.date} - {reclamoSeleccionado.time}</p>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-4">
              <button 
                onClick={() => resolverReclamo(reclamoSeleccionado.id)}
                className="flex-1 py-4 border-2 border-red-900/30 hover:border-red-500 text-red-600 dark:text-red-500 hover:text-red-400 text-xs font-bold tracking-widest uppercase rounded-xl transition-all transition-colors"
              >
                RECHAZAR
              </button>
              <button 
                onClick={() => resolverReclamo(reclamoSeleccionado.id)}
                className="flex-1 py-4 bg-[#388E3C] hover:bg-emerald-600 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-[#388E3C]/20 hover:shadow-[#388E3C]/40"
              >
                APROBAR PAGO
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => setReclamoSeleccionado(null)}
                className="py-2 px-4 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:text-white text-[10px] font-bold tracking-widest uppercase transition-colors"
              >
                CERRAR SIN CAMBIOS
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
