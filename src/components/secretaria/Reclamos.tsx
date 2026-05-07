import { Image, ClipboardList, Timer, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Reclamos() {
  const reclamos = [
    { id: 1, date: '24 OCT 2023', time: '14:32 PM', name: 'MARCOS G. VILLALBA', email: 'marcos.v@email.com', dni: '38.442.109', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, date: '23 OCT 2023', time: '09:15 AM', name: 'CARLA MENDEZ', email: 'carla.m88@email.com', dni: '42.115.903', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, date: '22 OCT 2023', time: '18:45 PM', name: 'JULIÁN PEREZ', email: 'j.perez.coach@email.com', dni: '35.667.112', avatar: 'https://i.pravatar.cc/150?img=12' },
  ];

  const handleVerificar = () => {
    alert('Abriendo comprobante del socio...');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Encabezado */}
      <div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">RECLAMOS</p>
        <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] tracking-tighter uppercase">RECLAMOS DE PAGO</h1>
      </div>

      {/* 2. Tabla Principal */}
      <div className="bg-[#151515] rounded-2xl border border-zinc-800/50 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="border-b border-zinc-800/80 text-[10px] text-zinc-500 uppercase tracking-widest">
                <th className="pb-4 font-bold">FECHA DE CARGA</th>
                <th className="pb-4 font-bold">SOCIO</th>
                <th className="pb-4 font-bold">DNI / ID</th>
                <th className="pb-4 font-bold text-center">COMPROBANTE</th>
                <th className="pb-4 font-bold text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {reclamos.map((r) => (
                <tr key={r.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-4">
                    <p className="text-sm font-bold text-white uppercase">{r.date}</p>
                    <p className="text-xs text-zinc-500">{r.time}</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover grayscale opacity-80 border border-zinc-700" />
                      <div>
                        <p className="text-sm font-bold text-white uppercase">{r.name}</p>
                        <p className="text-xs text-zinc-500">{r.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-white">{r.dni}</span>
                  </td>
                  <td className="py-4 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#1A1A1A] border border-zinc-800">
                      <Image className="w-5 h-5 text-zinc-500" />
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={handleVerificar}
                      className="px-6 py-2 bg-slate-500/20 hover:bg-slate-500/40 text-slate-300 text-xs font-bold rounded-full transition-colors cursor-pointer"
                    >
                      VERIFICAR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Tabla */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-6 mt-2 border-t border-zinc-800/50">
          <p className="text-[11px] text-zinc-500 font-bold tracking-widest uppercase">
            MOSTRANDO 3 DE 24 RECLAMOS PENDIENTES
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button className="p-2 rounded-lg bg-[#1A1A1A] border border-zinc-800 text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent border border-[#7B8B9E] text-[#7B8B9E] font-bold text-xs cursor-pointer">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent text-zinc-500 hover:text-white transition-colors font-bold text-xs cursor-pointer">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent text-zinc-500 hover:text-white transition-colors font-bold text-xs cursor-pointer">
              3
            </button>
            <button className="p-2 rounded-lg bg-[#1A1A1A] border border-zinc-800 text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Tarjetas KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        {/* Tarjeta 1 (Pendientes) */}
        <div className="bg-[#151515] rounded-xl p-6 border border-zinc-800/50 border-l-2 border-l-red-500 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">PENDIENTES HOY</h3>
            <ClipboardList className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-5xl font-normal text-white mb-2 tracking-tight">08</p>
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
            +2 DESDE LA ÚLTIMA HORA
          </p>
        </div>

        {/* Tarjeta 2 (Tiempo) */}
        <div className="bg-[#151515] rounded-xl p-6 border border-zinc-800/50 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">TIEMPO RESPUESTA</h3>
            <Timer className="w-5 h-5 text-zinc-500" />
          </div>
          <p className="text-5xl font-normal text-white mb-2 tracking-tight">14m</p>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            PROMEDIO DE GESTIÓN ACTIVA
          </p>
        </div>

        {/* Tarjeta 3 (Resueltos) */}
        <div className="bg-[#151515] rounded-xl p-6 border border-zinc-800/50 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">RESUELTOS SEMANA</h3>
            <CheckCircle2 className="w-5 h-5 text-zinc-500" />
          </div>
          <p className="text-5xl font-normal text-white mb-2 tracking-tight">142</p>
          <p className="text-[10px] font-bold text-[#7B8B9E] uppercase tracking-widest">
            92% EFECTIVIDAD DE COBRO
          </p>
        </div>

      </div>
    </div>
  );
}
