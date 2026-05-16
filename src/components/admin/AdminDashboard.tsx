export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-medium text-slate-900 dark:text-white tracking-wide mb-1 transition-colors">DASHBOARD</h2>
        <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium transition-colors">Panel de Control General y Gestión de Rendimiento</p>
      </div>

      {/* SECCIÓN KPI */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-zinc-800/60 rounded-xl p-6 relative transition-colors duration-300 shadow-sm dark:shadow-none">
          <div className="absolute top-6 right-6 text-slate-400 dark:text-zinc-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-4 transition-colors">RECAUDACIÓN MENSUAL</h3>
          <p className="text-4xl font-normal text-slate-900 dark:text-white mb-2 transition-colors">$42.850</p>
          <div className="flex items-center text-xs text-slate-700 dark:text-white font-medium transition-colors">
            <svg className="w-4 h-4 mr-1 text-slate-700 dark:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            <span>+12.4% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-zinc-800/60 rounded-xl p-6 relative transition-colors duration-300 shadow-sm dark:shadow-none">
          <div className="absolute top-6 right-6 text-slate-400 dark:text-zinc-400 transition-colors">
            <svg className="w-6 h-6 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
          </div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-4 transition-colors">ALUMNOS ACTIVOS</h3>
          <p className="text-4xl font-normal text-slate-900 dark:text-white mb-2 transition-colors">1,248</p>
          <div className="flex items-center text-xs text-slate-700 dark:text-white font-medium transition-colors">
            <svg className="w-4 h-4 mr-1 text-slate-700 dark:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span>45 registrados hoy</span>
          </div>
        </div>
      </div>

      {/* SECCIÓN GRÁFICO */}
      <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-zinc-800/60 rounded-xl p-8 transition-colors duration-300 shadow-sm dark:shadow-none">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white tracking-wide mb-8 transition-colors">INGRESOS MENSUALES</h3>
        <div className="h-56 flex items-end justify-between gap-4">
          {[
            { label: 'Ene', height: '30%', color: 'bg-slate-200 dark:bg-zinc-800' },
            { label: 'Feb', height: '45%', color: 'bg-slate-200 dark:bg-zinc-800' },
            { label: 'Mar', height: '60%', color: 'bg-slate-200 dark:bg-zinc-800' },
            { label: 'Abr', height: '50%', color: 'bg-slate-200 dark:bg-zinc-800' },
            { label: 'May', height: '75%', color: 'bg-slate-200 dark:bg-zinc-800' },
            { label: 'Jun', height: '95%', color: 'bg-slate-800 dark:bg-slate-400' }
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center justify-end w-full h-full">
              <span className="text-xs text-slate-500 dark:text-zinc-500 mb-2 transition-colors">{bar.label}</span>
              <div
                className={`w-full rounded-t-md transition-colors duration-300 ${bar.color}`}
                style={{ height: bar.height }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN TABLA */}
      <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-zinc-800/60 rounded-xl overflow-hidden pb-4 transition-colors duration-300 shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-zinc-800/60 transition-colors">
          <h3 className="text-sm font-medium text-slate-900 dark:text-white tracking-wide transition-colors">AUDITORÍA RECIENTE</h3>
          <button className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
            VER HISTORIAL COMPLETO
          </button>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/60 transition-colors">USUARIO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/60 transition-colors">ACCIÓN</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/60 transition-colors">MÓDULO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/60 transition-colors">FECHA/HORA</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest text-right border-b border-slate-200 dark:border-zinc-800/60 transition-colors">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded bg-slate-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-zinc-400 transition-colors">JP</div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Juan Pérez</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-zinc-300 transition-colors">Modificación de Precio</td>
                <td className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest transition-colors">FINANZAS</td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-zinc-500 transition-colors">14 Jun, 2024 - 10:45 AM</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 dark:bg-[#1B2A1E]/80 dark:text-[#4ADE80] dark:border-[#234A2E] transition-colors">
                    EXITOSO
                  </span>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded bg-slate-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-zinc-400 transition-colors">LG</div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Lucas Gómez</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-zinc-300 transition-colors">Intento de Login Fallido</td>
                <td className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest transition-colors">SEGURIDAD</td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-zinc-500 transition-colors">14 Jun, 2024 - 09:12 AM</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 dark:bg-[#2A1B1B]/80 dark:text-[#F87171] dark:border-[#4A2323] transition-colors">
                    BLOQUEADO
                  </span>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded bg-slate-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-zinc-400 transition-colors">MA</div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors">Melisa Admin</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-zinc-300 transition-colors">Alta Nuevo Socio</td>
                <td className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest transition-colors">MEMBRESÍAS</td>
                <td className="px-6 py-4 text-xs text-slate-500 dark:text-zinc-500 transition-colors">14 Jun, 2024 - 08:30 AM</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 dark:bg-[#1B2A1E]/80 dark:text-[#4ADE80] dark:border-[#234A2E] transition-colors">
                    EXITOSO
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
