import { useNavigate } from 'react-router-dom';
import { Search, Download, ArrowLeft, FileText } from 'lucide-react';

const morosos = [
  { id: 1, avatar: 'https://i.pravatar.cc/150?u=a1', name: 'Lucía Fernández', dni: '38.452.910', plan: 'Musculación Elite', planColor: 'bg-red-900/30 text-red-400', days: 45, amount: '$14.200,00' },
  { id: 2, avatar: 'https://i.pravatar.cc/150?u=a2', name: 'Marcos Rossi', dni: '41.201.033', plan: 'Crossfit Pro', planColor: 'bg-orange-900/30 text-orange-400', days: 12, amount: '$8.500,00' },
  { id: 3, avatar: 'https://i.pravatar.cc/150?u=a3', name: 'Sofía Méndez', dni: '35.981.222', plan: 'Funcional Plus', planColor: 'bg-green-900/30 text-green-400', days: 62, amount: '$22.400,00' },
  { id: 4, avatar: 'https://i.pravatar.cc/150?u=a4', name: 'Mateo Gómez', dni: '40.112.553', plan: 'Musculación Elite', planColor: 'bg-red-900/30 text-red-400', days: 8, amount: '$12.400,00' },
  { id: 5, avatar: 'https://i.pravatar.cc/150?u=a5', name: 'Valentina Ortiz', dni: '39.882.112', plan: 'Yoga & Balance', planColor: 'bg-purple-900/30 text-purple-400', days: 35, amount: '$9.800,00' },
];

export default function ClientesMora() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div>
        <h1 className="text-[3rem] font-black text-[#FAFAFA] tracking-tighter mb-2 uppercase leading-none">
          CLIENTES EN MORA
        </h1>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-zinc-400 text-sm">Listado detallado de <strong className="text-white">14 alumnos</strong> con deuda pendiente</span>
        </div>
      </div>

      {/* Barra de Herramientas (Filtros) */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-grow relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            className="w-full bg-[#151515] border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-[#FAFAFA] placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        <select className="bg-[#151515] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-300 focus:outline-none appearance-none pr-10 cursor-pointer">
          <option>Todos los Días de Mora</option>
          <option>Más de 30 días</option>
          <option>Más de 60 días</option>
        </select>
        <button className="flex items-center space-x-2 bg-[#151515] border border-zinc-800 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer">
          <Download className="w-4 h-4" />
          <span>Exportar Excel</span>
        </button>
      </div>

      {/* Tabla Principal */}
      <div className="bg-[#151515] border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">ALUMNO</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">DNI</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">PLAN</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-center">DÍAS DE MORA</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-right">MONTO ADEUDADO</th>
                <th className="px-6 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-right">ALERTA</th>
              </tr>
            </thead>
            <tbody>
              {morosos.map((m) => (
                <tr key={m.id} className="bg-[#1A1A1A] border-b border-zinc-800/30 hover:bg-white/[0.02] transition-colors last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                      <p className="text-sm font-medium text-[#FAFAFA]">{m.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-zinc-500">{m.dni}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ${m.planColor}`}>
                      {m.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-sm font-bold text-orange-500">{m.days} <span className="text-zinc-600 font-normal text-[10px] ml-1 uppercase tracking-wider">días</span></p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-[#FAFAFA]">{m.amount}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded border border-[#234A2E] bg-[#1B2A1E]/80 text-[#4ADE80] text-[9px] font-bold uppercase tracking-wider">
                      NOTIFICADO
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-[#151515] hover:bg-zinc-800 text-white px-6 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors border border-zinc-800 cursor-pointer">
            <FileText className="w-4 h-4" />
            <span>Exportar PDF</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#7B8B9E] hover:bg-slate-400 text-white px-6 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer">
            <FileText className="w-4 h-4" />
            <span>Exportar Listado de Morosos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
