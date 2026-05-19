import { Search, Filter, Eye, AlertTriangle, Users, DollarSign, ChevronDown } from 'lucide-react';

export default function ConsultaDeudoresEncargado() {
  const mockDeudores = [
    { id: 1, avatar: 'https://i.pravatar.cc/150?img=11', nombre: 'Juan Pérez', dni: '34.567.890', plan: 'Plan Musculación', vencimiento: 'Vencido (05 Oct)', diasMora: 14, monto: '$15.000' },
    { id: 2, avatar: 'https://i.pravatar.cc/150?img=44', nombre: 'María González', dni: '38.123.456', plan: 'Pase Libre', vencimiento: 'Vencido (20 Sep)', diasMora: 29, monto: '$22.000' },
    { id: 3, avatar: 'https://i.pravatar.cc/150?img=33', nombre: 'Carlos López', dni: '29.876.543', plan: 'Cross Training', vencimiento: 'Vencido (10 Ago)', diasMora: 70, monto: '$18.000' },
    { id: 4, avatar: 'https://i.pravatar.cc/150?img=12', nombre: 'Lucía Fernández', dni: '40.987.654', plan: 'Plan Musculación', vencimiento: 'Vencido (02 Nov)', diasMora: 3, monto: '$15.000' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Encabezado */}
      <div>
        <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-2">
          SEDE CENTRO - SUPERVISIÓN
        </p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-wide uppercase">
          CONSULTA DE DEUDORES
        </h1>
      </div>

      {/* 2. Panel de Métricas de Mora (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold tracking-widest uppercase">Monto Total en Mora</p>
            <DollarSign className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">$450.800</h2>
        </div>
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold tracking-widest uppercase">Cantidad de Deudores</p>
            <Users className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">24 Alumnos</h2>
        </div>
        <div className="bg-red-50 dark:bg-red-500/10 p-6 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-red-600 dark:text-red-400 font-bold tracking-widest uppercase">Mora Crítica (+30 días)</p>
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-black text-red-700 dark:text-red-400 tracking-tighter">8 Casos</h2>
        </div>
      </div>

      {/* 3. Filtros Estratégicos */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-[#151515] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input 
            type="text"
            placeholder="Buscar por nombre o DNI..."
            className="w-full bg-slate-50 dark:bg-[#0E0E0E] border border-slate-200 dark:border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-[#0E0E0E] border border-slate-200 dark:border-zinc-800 rounded-lg text-sm text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors w-full md:w-auto cursor-pointer">
            <span className="flex items-center"><Filter className="w-4 h-4 mr-2" /> Antigüedad</span>
            <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
          </button>
          <button className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-[#0E0E0E] border border-slate-200 dark:border-zinc-800 rounded-lg text-sm text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors w-full md:w-auto cursor-pointer">
            <span className="flex items-center"><Filter className="w-4 h-4 mr-2" /> Plan</span>
            <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
          </button>
        </div>
      </div>

      {/* 4. Estilo de la Tabla */}
      <div className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800">SOCIO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800">DOCUMENTO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800">ESTADO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800">DEUDA</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {mockDeudores.map((d) => (
                <tr key={d.id} className="border-b border-slate-100 dark:border-zinc-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-[#1A1A1A] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={d.avatar} alt={d.nombre} className="w-8 h-8 rounded-full border border-slate-200 dark:border-zinc-700" />
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{d.nombre}</p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-500">{d.plan}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium">{d.dni}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center px-2 py-1 rounded bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-900/50 mb-1">
                      <span className="text-[9px] font-bold text-red-700 dark:text-red-400 tracking-widest uppercase">DEUDOR</span>
                    </div>
                    {/* Color rojo vibrante requerido en ambos temas */}
                    <p className="text-xs font-bold text-red-600 dark:text-red-500 mt-0.5">{d.vencimiento}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{d.monto}</p>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500">{d.diasMora} días de mora</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/* 1. Único ícono de "Ver Ficha" */}
                    <button className="p-2 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white bg-slate-50 hover:bg-slate-200 dark:bg-[#0E0E0E] dark:hover:bg-zinc-800 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer" title="Ver Ficha">
                      <Eye className="w-4 h-4" />
                    </button>
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
