import { useNavigate } from 'react-router-dom';
import { Banknote, Clock, AlertTriangle, Search, Filter, ArrowLeft, Download, TrendingUp } from 'lucide-react';

const pagos = [
  { id: 1, date: '24 Oct 2023', name: 'Martín Rodríguez', dni: '34.555.880', sede: 'Sede Norte', concepto: 'Cuota Mensual (Oct)', amount: '$ 25,000', status: 'Recibido', avatar: 'MR' },
  { id: 2, date: '23 Oct 2023', name: 'Laura Gómez', dni: '41.214.557', sede: 'Sede Centro', concepto: 'Pase Libre Anual', amount: '$ 180,000', status: 'Recibido', avatar: 'LG' },
  { id: 3, date: '25 Oct 2023 (vence)', name: 'Carlos Silva', dni: '28.875.143', sede: 'Sede Sur', concepto: 'Cuota Mensual + Locker', amount: '$ 28,500', status: 'Pendiente', avatar: 'CS' },
  { id: 4, date: '10 Oct 2023', name: 'Valeria Fernández', dni: '38.111.222', sede: 'Sede Centro', concepto: 'Clases Personales (x10)', amount: '$ 45,000', status: 'Deuda', avatar: 'VF' },
  { id: 5, date: '22 Oct 2023', name: 'Juan Pérez', dni: '31.144.255', sede: 'Sede Norte', concepto: 'Inscripción Inicial', amount: '$ 15,000', status: 'Recibido', avatar: 'JP' },
];

export default function EstadosPago() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Encabezado */}
      <div>
        <h1 className="text-[3rem] font-black text-[#FAFAFA] tracking-tighter mb-6 uppercase leading-none">
          ESTADOS DE PAGO
        </h1>
      </div>

      {/* Tarjetas KPI Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#151515] p-6 rounded-2xl border-b-2 border-emerald-500 relative">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">TOTAL RECIBIDO</p>
            <Banknote className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-3xl font-normal text-[#FAFAFA]">$1,245,000</p>
            <span className="text-emerald-500 text-xs font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
            </span>
          </div>
          <p className="text-sm text-zinc-400">Este mes</p>
        </div>

        <div className="bg-[#151515] p-6 rounded-2xl border-b-2 border-yellow-500 relative">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">TOTAL PENDIENTE</p>
            <Clock className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-3xl font-normal text-[#FAFAFA]">$342,500</p>
            <span className="text-zinc-500 text-xs font-bold">-8%</span>
          </div>
          <p className="text-sm text-zinc-400">Próximos 15 días</p>
        </div>

        <div className="bg-[#151515] p-6 rounded-2xl border-b-2 border-red-500 relative">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">TOTAL EN DEUDA</p>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-3xl font-normal text-[#FAFAFA]">$85,200</p>
            <span className="text-red-500 text-xs font-bold">-3%</span>
          </div>
          <p className="text-sm text-zinc-400">Vencido {">"} 30 días</p>
        </div>
      </div>

      {/* Barra de Herramientas (Filtros) */}
      <div className="flex flex-col md:flex-row items-center gap-4 py-2">
        <div className="flex-grow relative w-full md:w-auto">
          <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por Nombre, DNI o Ref..."
            className="w-full bg-[#151515] border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-[#FAFAFA] placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        <select className="bg-[#151515] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-300 focus:outline-none appearance-none pr-10 min-w-[160px] cursor-pointer">
          <option>Todas las Sedes</option>
        </select>
        <select className="bg-[#151515] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-300 focus:outline-none appearance-none pr-10 min-w-[140px] cursor-pointer">
          <option>Mes Actual</option>
        </select>
        <select className="bg-[#151515] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-300 focus:outline-none appearance-none pr-10 min-w-[160px] cursor-pointer">
          <option>Todos los Estados</option>
        </select>
        <button className="p-3 bg-[#151515] border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors cursor-pointer">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Tabla Principal */}
      <div className="bg-[#151515] border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">FECHA</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">SOCIO / ALUMNO</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">SEDE</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">CONCEPTO</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">MONTO</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((p) => (
                <tr key={p.id} className="bg-[#1A1A1A] border-b border-zinc-800/30 hover:bg-white/[0.02] transition-colors last:border-0">
                  <td className="px-6 py-4">
                    <p className={`text-sm font-medium ${p.status === 'Deuda' ? 'text-red-500' : 'text-[#FAFAFA]'}`}>
                      {p.date}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-[#FAFAFA]">
                        {p.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#FAFAFA]">{p.name}</p>
                        <p className="text-[10px] text-zinc-500">DNI: {p.dni}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-zinc-400">{p.sede}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-zinc-300">{p.concepto}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-[#FAFAFA]">{p.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider 
                      ${p.status === 'Recibido' ? 'bg-[#1B2A1E]/80 text-[#4ADE80] border border-[#234A2E]' : 
                        p.status === 'Pendiente' ? 'bg-[#3A2D12]/80 text-[#FBBF24] border border-[#52401A]' : 
                        'bg-[#3A1818]/80 text-[#F87171] border border-[#5A2525]'}`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-zinc-800 bg-[#151515]">
          <p className="text-[10px] font-bold text-zinc-500 tracking-widest">Mostrando 1 a 5 de 1,245 registros</p>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1.5 rounded text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer">Anterior</button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-[#7B8B9E] text-white text-xs font-bold cursor-pointer">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-800 text-zinc-400 text-xs font-medium cursor-pointer">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-800 text-zinc-400 text-xs font-medium cursor-pointer">3</button>
            <span className="w-7 h-7 flex items-center justify-center text-zinc-500 text-xs">...</span>
            <button className="px-3 py-1.5 rounded text-xs border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Footer (Acciones Inferiores) */}
      <div className="flex items-center justify-between mt-6">
        <button 
          onClick={() => navigate('/admin/finanzas')}
          className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER AL DASHBOARD FINANCIERO</span>
        </button>
        
        <button className="flex items-center space-x-2 bg-[#7B8B9E] hover:bg-slate-400 text-white px-6 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer">
          <Download className="w-4 h-4" />
          <span>Exportar Reporte</span>
        </button>
      </div>
    </div>
  );
}
