import { Banknote, TrendingDown, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function EncargadoDashboard() {
  const mockOperaciones = [
    { id: 1, avatar: 'https://i.pravatar.cc/150?img=11', socio: 'Martín Rodríguez', accion: 'Pago Registrado', personal: 'Secretaría - Turno Mañana', hora: '09:15 AM', monto: '$15.000', estado: 'exito' },
    { id: 2, avatar: 'https://i.pravatar.cc/150?img=44', socio: 'Laura Gómez', accion: 'Acceso Denegado', personal: 'Molinete Principal', hora: '10:30 AM', monto: '-', estado: 'bloqueo' },
    { id: 3, avatar: 'https://i.pravatar.cc/150?img=33', socio: 'Carlos Sánchez', accion: 'Pago Registrado', personal: 'Secretaría - Turno Tarde', hora: '14:20 PM', monto: '$22.000', estado: 'exito' },
    { id: 4, avatar: 'https://i.pravatar.cc/150?img=12', socio: 'Ana Martínez', accion: 'Acceso Denegado', personal: 'Molinete Secundario', hora: '16:45 PM', monto: '-', estado: 'bloqueo' },
    { id: 5, avatar: 'https://i.pravatar.cc/150?img=55', socio: 'Diego López', accion: 'Pago Registrado', personal: 'Secretaría - Turno Tarde', hora: '18:10 PM', monto: '$18.000', estado: 'exito' }
  ];

  const chartData = [
    { day: 'LUN', height: '60%', value: '$120.000' },
    { day: 'MAR', height: '45%', value: '$90.000' },
    { day: 'MIE', height: '80%', value: '$160.000' },
    { day: 'JUE', height: '65%', value: '$130.000' },
    { day: 'VIE', height: '90%', value: '$180.000' },
    { day: 'SAB', height: '40%', value: '$80.000' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* 1. Encabezado de Contexto */}
      <div>
        <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-2">
          SEDE CENTRO - OPERACIONES Y COBRANZAS
        </p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-wide uppercase">
          DASHBOARD SUCURSAL
        </h1>
      </div>

      {/* 2. Tarjetas KPI Refinadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI: Caja Diaria (Green) */}
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/30 shadow-sm transition-colors relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold tracking-widest uppercase mb-1">CAJA DIARIA</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">$145.000</h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <Banknote className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-bold tracking-wider relative z-10">
            <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md text-[9px] uppercase border border-emerald-200 dark:border-emerald-500/20">+8% vs ayer</span>
          </div>
          <Banknote className="w-32 h-32 text-emerald-50 dark:text-emerald-900/10 absolute -bottom-6 -right-6 transform -rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110" />
        </div>

        {/* KPI: Índice de Morosidad (Red/Orange down trend) */}
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-200 dark:border-orange-900/30 shadow-sm transition-colors relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold tracking-widest uppercase mb-1">ÍNDICE DE MOROSIDAD</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">12%</h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <TrendingDown className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-bold tracking-wider relative z-10">
             <span className="text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1 rounded-md text-[9px] uppercase border border-orange-200 dark:border-orange-500/20">45 Socios en Mora</span>
          </div>
          <TrendingDown className="w-32 h-32 text-orange-50 dark:text-orange-900/10 absolute -bottom-6 -right-6 transform -rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110" />
        </div>

        {/* KPI: Accesos Bloqueados (Red) */}
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-200 dark:border-red-900/30 shadow-sm transition-colors relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold tracking-widest uppercase mb-1">ACCESOS BLOQUEADOS</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">14</h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-bold tracking-wider relative z-10">
            <span className="text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2.5 py-1 rounded-md text-[9px] uppercase border border-red-200 dark:border-red-500/20">Rebotes en molinete hoy</span>
          </div>
          <ShieldAlert className="w-32 h-32 text-red-50 dark:text-red-900/10 absolute -bottom-6 -right-6 transform -rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110" />
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Monitor de Operaciones */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151515] rounded-2xl border border-slate-200 dark:border-zinc-800/60 shadow-sm transition-colors overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-zinc-800/60 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">MONITOR DE OPERACIONES</h3>
            <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 px-3 py-1.5 rounded-md tracking-widest uppercase flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              EN VIVO
            </span>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/60">SOCIO</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/60">ACCIÓN / ORIGEN</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/60">MONTO</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/60 text-right">HORA</th>
                </tr>
              </thead>
              <tbody>
                {mockOperaciones.map((op) => (
                  <tr key={op.id} className="border-b border-slate-50 dark:border-zinc-800/30 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                         <img src={op.avatar} alt={op.socio} className="w-8 h-8 rounded-full border border-slate-200 dark:border-zinc-700" />
                         <p className="text-sm font-bold text-slate-900 dark:text-white">{op.socio}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {op.estado === 'exito' ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                             <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                             <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                        )}
                        <div>
                          <p className={`text-xs font-bold uppercase tracking-wider ${op.estado === 'exito' ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                            {op.accion}
                          </p>
                          <p className="text-[10px] font-medium text-slate-500 dark:text-zinc-500 mt-0.5">{op.personal}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-black ${op.monto !== '-' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-zinc-600'}`}>
                        {op.monto}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs text-slate-500 dark:text-zinc-400 font-bold bg-slate-100 dark:bg-zinc-800/80 px-2 py-1 rounded">
                        {op.hora}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Gráfico Rápido de Ingresos Semanales */}
        <div className="bg-white dark:bg-[#151515] rounded-2xl border border-slate-200 dark:border-zinc-800/60 shadow-sm transition-colors p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">RECAUDACIÓN SEMANAL</h3>
            <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest">Evolución últimos 6 días</p>
          </div>
          
          <div className="flex-1 flex items-end justify-between space-x-2 h-56 mt-4">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center justify-end w-full h-full group cursor-pointer">
                <div 
                  className="w-full bg-emerald-100 dark:bg-emerald-500/20 hover:bg-emerald-200 dark:hover:bg-emerald-500/40 rounded-t-lg transition-all duration-300 relative border-t-2 border-transparent hover:border-emerald-400"
                  style={{ height: data.height }}
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl py-1.5 px-3 rounded-md transition-all duration-300 pointer-events-none flex flex-col items-center">
                    <span className="text-[11px] font-black">{data.value}</span>
                    <div className="w-2 h-2 bg-slate-900 dark:bg-white transform rotate-45 absolute -bottom-1"></div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 mt-4 tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {data.day}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
