import { Search, FileText, Download, AlertTriangle, History, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const logs = [
  { id: 1, user: 'Admin_Mario', ip: '192.168.1.42', avatar: 'AM', avatarBg: 'bg-[#1B2A1E] text-[#4ADE80]', action: 'ELIMINACIÓN DE USUARIO', actionBg: 'bg-red-950/30 text-red-500 border border-red-900/50', modulo: 'Gestión Clientes', date: '24 Oct, 2023\n14:22:05', status: 'Éxito', statusColor: 'bg-[#4ADE80]', isAlert: false },
  { id: 2, user: 'Lucia_Rec', ip: '192.168.1.15', avatar: 'LR', avatarBg: 'bg-[#1B2A1E] text-[#4ADE80]', action: 'CAMBIO DE PASSWORD', actionBg: 'bg-zinc-800 text-white border border-zinc-700', modulo: 'Perfil', date: '24 Oct, 2023\n13:45:12', status: 'Éxito', statusColor: 'bg-[#4ADE80]', isAlert: false },
  { id: 3, user: 'Anónimo', ip: '201.24.11.90', avatar: '?', avatarBg: 'bg-red-900/40 text-red-500', action: 'FALLA DE LOGIN', actionBg: 'bg-orange-950/50 text-orange-500 border border-orange-900/50', modulo: 'Auth System', date: '24 Oct, 2023\n12:10:59', status: 'BLOQUEADO', statusColor: 'bg-red-500', isAlert: true },
  { id: 4, user: 'SuperAdmin', ip: '127.0.0.1', avatar: 'SA', avatarBg: 'bg-[#3A2D12] text-[#FBBF24]', action: 'UPDATE SYSTEM CONFIG', actionBg: 'bg-[#3A2D12]/50 text-[#FBBF24] border border-[#52401A]', modulo: 'Ajustes Globales', date: '24 Oct, 2023\n09:30:00', status: 'Éxito', statusColor: 'bg-[#4ADE80]', isAlert: false },
];

export default function AuditoriaLogs() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[3rem] font-black tracking-tighter mb-1 uppercase leading-none">
            <span className="text-[#FAFAFA]">AUDITORÍA</span> <span className="text-slate-500">(LOGS)</span>
          </h1>
          <p className="text-zinc-400 text-sm">
            Supervisión en tiempo real de la actividad administrativa y operacional del sistema.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center space-x-2 bg-[#151515] border border-zinc-800 hover:bg-zinc-800 text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer">
            <FileText className="w-4 h-4" />
            <span>Exportar Excel</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#7B8B9E] hover:bg-slate-400 text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Exportar Reporte PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Panel de Filtros */}
      <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">BÚSQUEDA AVANZADA</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
              <input type="text" placeholder="Ej: ID de Usuario..." className="w-full bg-[#1A1A1A] text-white h-10 rounded-lg pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700" />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">TIPO DE ACCIÓN</label>
            <select className="w-full bg-[#1A1A1A] text-white h-10 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700 appearance-none cursor-pointer">
              <option>Todos los eventos</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">USUARIO RESPONSABLE</label>
            <select className="w-full bg-[#1A1A1A] text-white h-10 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700 appearance-none cursor-pointer">
              <option>Cualquier administrador</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">RANGO DE FECHAS</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
              <input type="text" defaultValue="Hoy, 24 Oct 2023" readOnly className="w-full bg-[#1A1A1A] text-white h-10 rounded-lg pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tarjetas KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="md:col-span-2 bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-2">ALERTAS DE SEGURIDAD (24H)</p>
          <div className="flex items-end justify-between relative z-10">
            <div>
              <p className="text-[4rem] font-bold text-[#FAFAFA] leading-none mb-2">04</p>
              <p className="text-red-500 text-sm font-bold flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1.5" />
                Acciones críticas detectadas
              </p>
            </div>
          </div>
          {/* Gráfico Ecualizador simulado fondo */}
          <div className="absolute right-8 bottom-6 flex items-end space-x-1.5 opacity-80">
            <div className="w-2.5 h-6 bg-red-900/50 rounded-sm"></div>
            <div className="w-2.5 h-10 bg-red-500 rounded-sm"></div>
            <div className="w-2.5 h-14 bg-orange-500 rounded-sm"></div>
            <div className="w-2.5 h-8 bg-red-900/50 rounded-sm"></div>
            <div className="w-2.5 h-4 bg-zinc-800 rounded-sm"></div>
          </div>
        </div>

        <div className="md:col-span-1 bg-[#7B8B9E] rounded-2xl p-6 relative flex flex-col justify-between min-h-[140px]">
          <History className="w-6 h-6 text-white mb-4" />
          <div>
            <p className="text-[2.5rem] font-normal text-white leading-none mb-1">1,284</p>
            <p className="text-[9px] text-white/70 font-bold tracking-widest uppercase">REGISTROS TOTALES / MES</p>
          </div>
        </div>
      </div>

      {/* 4. Tabla Historial de Eventos */}
      <div className="bg-[#151515] rounded-2xl border border-zinc-800/50 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
          <h2 className="text-sm font-bold text-[#FAFAFA] uppercase tracking-widest">HISTORIAL DE EVENTOS</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></div>
            <span className="text-xs text-zinc-400">Live Feed Activado</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">USUARIO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">ACCIÓN</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">MÓDULO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">FECHA / HORA</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className={`border-b border-zinc-800/30 last:border-0 ${log.isAlert ? 'bg-red-950/10' : 'bg-[#1A1A1A]'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${log.avatarBg}`}>
                        {log.avatar}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${log.isAlert ? 'text-red-500' : 'text-[#FAFAFA]'}`}>{log.user}</p>
                        <p className="text-[10px] text-zinc-500">{log.ip}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${log.actionBg}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#FAFAFA] font-medium">{log.modulo}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] text-[#FAFAFA] whitespace-pre-line">{log.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${log.statusColor}`}></div>
                      <span className={`text-xs font-bold ${log.isAlert ? 'text-red-500' : 'text-[#4ADE80]'}`}>{log.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 flex items-center justify-between border-t border-zinc-800/50">
          <p className="text-xs text-zinc-500">Mostrando 1 a 10 de 1,284 registros</p>
          <div className="flex space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-zinc-900 text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#7B8B9E] text-white font-bold text-xs cursor-pointer">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-zinc-900 text-zinc-400 hover:text-white transition-colors text-xs font-bold cursor-pointer">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-zinc-900 text-zinc-400 hover:text-white transition-colors text-xs font-bold cursor-pointer">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-zinc-900 text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Footer del Sistema */}
      <div className="flex items-center justify-between pt-4 pb-2 text-[10px] font-bold tracking-widest uppercase">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></div>
            <span className="text-zinc-500">BASE DE DATOS: OK</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></div>
            <span className="text-zinc-500">LATENCY: 14MS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            <span className="text-red-500">INTEGRIDAD: CHECK PENDING</span>
          </div>
        </div>
        <div className="text-zinc-600">
          SQUAT_OS v2.4.0 STABLE
        </div>
      </div>

    </div>
  );
}
