import { Bell, Users, Banknote, CheckCircle2, Wallet, LineChart } from 'lucide-react';

export default function SecretariaDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-50 dark:bg-[#0E0E0E] min-h-full">
      
      {/* 1. Topbar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 pb-6">
        <h1 className="text-xs font-bold text-slate-500 dark:text-zinc-400 tracking-[0.2em] uppercase">
          DASHBOARD
        </h1>
        
        <div className="flex items-center space-x-6">
          <button className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 pl-6">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Alicia Rossi</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold">SECRETARÍA</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden border border-slate-300 dark:border-zinc-700">
              {/* Simulación de Avatar de Alicia Rossi */}
              <img src="https://i.pravatar.cc/150?u=alicia" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tarjetas Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        
        {/* Tarjeta 1 */}
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 transition-colors shadow-sm dark:shadow-none">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest leading-relaxed">SOCIOS ACTIVOS<br/>HOY</h3>
            <Users className="w-5 h-5 text-slate-400 dark:text-zinc-600" />
          </div>
          <div className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">142</div>
          <div className="flex items-center text-[#7B8B9E] text-[10px] font-bold">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            +8% vs ayer
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 transition-colors shadow-sm dark:shadow-none">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">PAGOS PENDIENTES</h3>
            <Banknote className="w-5 h-5 text-red-600 dark:text-red-500/50" />
          </div>
          <div className="text-5xl font-black text-[#EF4444] tracking-tighter mb-2">12</div>
          <div className="text-slate-500 dark:text-zinc-500 text-[10px] font-bold italic">
            Requiere seguimiento
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 transition-colors shadow-sm dark:shadow-none">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">PAGOS REALIZADOS</h3>
            <Wallet className="w-5 h-5 text-[#22C55E]/50" />
          </div>
          <div className="text-5xl font-black text-[#22C55E] tracking-tighter mb-2">45</div>
          <div className="flex items-center text-[#22C55E]/80 text-[10px] font-bold">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Operación Normal
          </div>
        </div>

        {/* Tarjeta 4 */}
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border-l-2 border-l-[#7B8B9E] border-y border-r border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 transition-colors shadow-sm dark:shadow-none">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">INGRESOS DEL DÍA</h3>
            <Wallet className="w-5 h-5 text-[#7B8B9E]/50" />
          </div>
          <div className="text-4xl lg:text-5xl font-black text-[#7B8B9E] tracking-tighter mb-2">$124.800</div>
          <div className="text-slate-500 dark:text-zinc-500 text-[10px] font-bold">
            AR Peso Argentino
          </div>
        </div>
      </div>

      {/* 3. Sección Media */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Izquierda: Actividad de Pagos */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 flex flex-col transition-colors shadow-sm dark:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Actividad de Pagos</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1 mb-4">Flujo de ingresos anual (por meses)</p>
              <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">$124,800</div>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Ingresos totales acumulados</p>
            </div>
            <div className="flex flex-col sm:items-end">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-500 rounded-sm mr-2"></div>
                  <span className="text-xs text-slate-500 dark:text-zinc-400">Anual</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-zinc-700 rounded-sm mr-2"></div>
                  <span className="text-xs text-slate-500 dark:text-zinc-400">Anterior</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gráfico de Barras Alta Fidelidad */}
          <div className="relative mt-4 h-64">
            {/* Eje Y y Líneas de Guía */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
              {['120k', '90k', '60k', '30k', '0'].map((label, i) => (
                <div key={i} className="flex items-center w-full">
                  <div className="w-8 text-right pr-2 text-[10px] text-slate-500 dark:text-zinc-500 font-medium tracking-tighter">{label}</div>
                  <div className="flex-1 border-b border-dashed border-slate-200 dark:border-zinc-800/80"></div>
                </div>
              ))}
            </div>

            {/* Barras y Eje X */}
            <div className="absolute inset-0 pl-10 flex items-end justify-between pb-6 pt-2 z-10">
              {[
                { month: 'ENE', cyan: 30, gray: 20 },
                { month: 'FEB', cyan: 40, gray: 25 },
                { month: 'MAR', cyan: 35, gray: 30 },
                { month: 'ABR', cyan: 55, gray: 40 },
                { month: 'MAY', cyan: 60, gray: 45 },
                { month: 'JUN', cyan: 95, gray: 70 },
                { month: 'JUL', cyan: 80, gray: 60 },
                { month: 'AGO', cyan: 75, gray: 55, isHover: true },
                { month: 'SET', cyan: 65, gray: 50 },
                { month: 'OCT', cyan: 50, gray: 40 },
                { month: 'NOV', cyan: 40, gray: 35 },
                { month: 'DIC', cyan: 25, gray: 20 },
              ].map((data, i) => (
                <div key={i} className="flex flex-col items-center relative h-full justify-end w-full group">
                  {/* Tooltip Hover (simulado en AGO) */}
                  {data.isHover && (
                    <div className="absolute -top-14 z-20 bg-slate-100 dark:bg-zinc-800 rounded-md p-2.5 shadow-xl shadow-black/50 border border-slate-300 dark:border-zinc-700/50 min-w-[140px] flex flex-col items-center">
                      <span className="text-[11px] font-bold text-slate-900 dark:text-white mb-1.5">{data.month}</span>
                      <span className="text-[10px] text-slate-600 dark:text-zinc-300 mb-0.5">Anual: 88.000,00 ARS</span>
                      <span className="text-[10px] text-slate-500 dark:text-zinc-400">Anterior: 65.000,00 ARS</span>
                      <div className="absolute -bottom-1 w-2.5 h-2.5 bg-slate-100 dark:bg-zinc-800 border-b border-r border-slate-300 dark:border-zinc-700/50 rotate-45"></div>
                    </div>
                  )}

                  <div className="flex items-end justify-center w-full gap-[2px] sm:gap-1 px-0.5 h-full z-10">
                    {/* Barra Anterior (Gris) */}
                    <div 
                      className="w-1/2 max-w-[14px] bg-zinc-700 rounded-t-[3px] transition-all duration-300"
                      style={{ height: `${data.gray}%` }}
                    ></div>
                    {/* Barra Anual (Cyan) */}
                    <div 
                      className={`w-1/2 max-w-[14px] bg-cyan-500 rounded-t-[3px] transition-all duration-300 ${
                        data.isHover ? 'drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] brightness-110' : ''
                      }`}
                      style={{ height: `${data.cyan}%` }}
                    ></div>
                  </div>
                  
                  {/* Etiqueta Eje X */}
                  <span className={`absolute -bottom-6 text-[10px] font-bold transition-colors ${data.isHover ? 'text-cyan-400' : 'text-slate-500 dark:text-zinc-500'}`}>
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Derecha: Estado de Sistema */}
        <div className="lg:col-span-1 bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 flex flex-col h-80 transition-colors shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">ESTADO DE SISTEMA</h2>
            <div className="w-2 h-2 rounded-full bg-slate-800 dark:bg-[#7B8B9E]"></div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600 dark:text-zinc-300">Capacidad Operativa</span>
              <span className="text-sm font-bold text-[#7B8B9E]">85%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-zinc-800/50 rounded-full h-2.5">
              <div className="bg-slate-800 dark:bg-[#7B8B9E] h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-200 dark:border-zinc-800/30">
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-zinc-500 italic">
              El servidor está respondiendo dentro de los parámetros normales. Todas las terminales de pago están sincronizadas.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Sección Inferior */}
      <div className="bg-white dark:bg-[#151515] p-10 rounded-2xl border border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 flex flex-col items-center justify-center text-center mt-6 transition-colors shadow-sm dark:shadow-none">
        <div className="w-16 h-16 rounded-full border border-slate-300 dark:border-zinc-700/50 flex items-center justify-center bg-slate-200 dark:bg-zinc-900/50 mb-6">
          <LineChart className="w-8 h-8 text-slate-500 dark:text-zinc-500" />
        </div>
        <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3">
          REGISTRO DE OPERACIONES
        </h2>
        <p className="text-xs text-slate-500 dark:text-zinc-500 max-w-sm leading-relaxed">
          Sistema de monitoreo SquatGym activo. Los datos históricos se sincronizan en tiempo real.
        </p>
        <div className="mt-8 flex space-x-2 items-center opacity-30">
          <div className="w-10 h-px bg-zinc-600"></div>
          <div className="w-1 h-1 bg-slate-800 dark:bg-[#7B8B9E] rounded-full"></div>
          <div className="w-10 h-px bg-zinc-600"></div>
        </div>
      </div>

    </div>
  );
}
