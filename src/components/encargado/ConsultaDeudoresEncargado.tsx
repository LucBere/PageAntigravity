import { useState } from 'react';
import { Search, Eye, AlertTriangle, Users, DollarSign, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Socio {
  id: number;
  avatar: string;
  nombre: string;
  dni: string;
  plan: string;
  vencimiento: string;
  diasMora: number;
  monto: string;
}

export default function ConsultaDeudoresEncargado() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');
  const [selectedSocio, setSelectedSocio] = useState<Socio | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const mockDeudores: Socio[] = [
    { id: 1, avatar: 'https://i.pravatar.cc/150?img=11', nombre: 'Juan Pérez', dni: '34.567.890', plan: 'Plan Musculación', vencimiento: 'Vencido (05 Oct)', diasMora: 14, monto: '$15.000' },
    { id: 2, avatar: 'https://i.pravatar.cc/150?img=44', nombre: 'María González', dni: '38.123.456', plan: 'Pase Libre', vencimiento: 'Vencido (20 Sep)', diasMora: 29, monto: '$22.000' },
    { id: 3, avatar: 'https://i.pravatar.cc/150?img=33', nombre: 'Carlos López', dni: '29.876.543', plan: 'Cross Training', vencimiento: 'Vencido (10 Ago)', diasMora: 70, monto: '$18.000' },
    { id: 4, avatar: 'https://i.pravatar.cc/150?img=12', nombre: 'Lucía Fernández', dni: '40.987.654', plan: 'Plan Musculación', vencimiento: 'Vencido (02 Nov)', diasMora: 3, monto: '$15.000' },
    { id: 5, avatar: 'https://i.pravatar.cc/150?img=14', nombre: 'Roberto Sánchez', dni: '31.234.567', plan: 'Cross Training', vencimiento: 'Vencido (15 Oct)', diasMora: 18, monto: '$18.000' },
    { id: 6, avatar: 'https://i.pravatar.cc/150?img=15', nombre: 'Elena Gómez', dni: '39.876.543', plan: 'Pase Libre', vencimiento: 'Vencido (01 Nov)', diasMora: 4, monto: '$22.000' },
    { id: 7, avatar: 'https://i.pravatar.cc/150?img=16', nombre: 'Martín Torres', dni: '28.345.678', plan: 'Plan Musculación', vencimiento: 'Vencido (25 Oct)', diasMora: 8, monto: '$15.000' },
    { id: 8, avatar: 'https://i.pravatar.cc/150?img=17', nombre: 'Sofía Díaz', dni: '41.456.789', plan: 'Pase Libre', vencimiento: 'Vencido (12 Sep)', diasMora: 38, monto: '$22.000' },
    { id: 9, avatar: 'https://i.pravatar.cc/150?img=18', nombre: 'Lucas Ruiz', dni: '35.567.890', plan: 'Cross Training', vencimiento: 'Vencido (20 Oct)', diasMora: 13, monto: '$18.000' },
    { id: 10, avatar: 'https://i.pravatar.cc/150?img=19', nombre: 'Valeria Castro', dni: '37.678.901', plan: 'Plan Musculación', vencimiento: 'Vencido (28 Oct)', diasMora: 5, monto: '$15.000' },
    { id: 11, avatar: 'https://i.pravatar.cc/150?img=20', nombre: 'Joaquín Navarro', dni: '33.789.012', plan: 'Pase Libre', vencimiento: 'Vencido (05 Sep)', diasMora: 45, monto: '$22.000' },
    { id: 12, avatar: 'https://i.pravatar.cc/150?img=21', nombre: 'Camila Herrera', dni: '42.890.123', plan: 'Cross Training', vencimiento: 'Vencido (30 Oct)', diasMora: 2, monto: '$18.000' },
    { id: 13, avatar: 'https://i.pravatar.cc/150?img=22', nombre: 'Facundo Silva', dni: '30.901.234', plan: 'Plan Musculación', vencimiento: 'Vencido (18 Oct)', diasMora: 15, monto: '$15.000' },
    { id: 14, avatar: 'https://i.pravatar.cc/150?img=23', nombre: 'Agustina Luna', dni: '36.012.345', plan: 'Pase Libre', vencimiento: 'Vencido (22 Ago)', diasMora: 55, monto: '$22.000' },
    { id: 15, avatar: 'https://i.pravatar.cc/150?img=24', nombre: 'Nicolás Vega', dni: '32.123.456', plan: 'Cross Training', vencimiento: 'Vencido (08 Oct)', diasMora: 25, monto: '$18.000' },
    { id: 16, avatar: 'https://i.pravatar.cc/150?img=25', nombre: 'Florencia Ríos', dni: '43.234.567', plan: 'Plan Musculación', vencimiento: 'Vencido (29 Oct)', diasMora: 4, monto: '$15.000' },
    { id: 17, avatar: 'https://i.pravatar.cc/150?img=26', nombre: 'Matías Blanco', dni: '27.345.678', plan: 'Pase Libre', vencimiento: 'Vencido (15 Sep)', diasMora: 35, monto: '$22.000' },
    { id: 18, avatar: 'https://i.pravatar.cc/150?img=27', nombre: 'Carolina Moya', dni: '38.456.789', plan: 'Cross Training', vencimiento: 'Vencido (26 Oct)', diasMora: 7, monto: '$18.000' },
    { id: 19, avatar: 'https://i.pravatar.cc/150?img=28', nombre: 'Emiliano Paz', dni: '34.567.890', plan: 'Plan Musculación', vencimiento: 'Vencido (10 Oct)', diasMora: 22, monto: '$15.000' },
    { id: 20, avatar: 'https://i.pravatar.cc/150?img=29', nombre: 'Julieta Ramos', dni: '40.678.901', plan: 'Pase Libre', vencimiento: 'Vencido (02 Oct)', diasMora: 31, monto: '$22.000' },
    { id: 21, avatar: 'https://i.pravatar.cc/150?img=30', nombre: 'Santiago Cruz', dni: '25.789.012', plan: 'Cross Training', vencimiento: 'Vencido (10 Nov)', diasMora: 1, monto: '$18.000' },
    { id: 22, avatar: 'https://i.pravatar.cc/150?img=31', nombre: 'Martina Vargas', dni: '39.901.234', plan: 'Plan Musculación', vencimiento: 'Vencido (20 Oct)', diasMora: 12, monto: '$15.000' }
  ];

  const filteredDeudores = mockDeudores.filter(socio => {
    // Filtro por búsqueda
    const matchesSearch = socio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          socio.dni.includes(searchTerm);
    
    // Filtro por pestaña
    let matchesTab = true;
    if (activeTab === 'Mora Reciente (1-15 días)') {
      matchesTab = socio.diasMora >= 1 && socio.diasMora <= 15;
    } else if (activeTab === 'Mora Crítica (+15 días)') {
      matchesTab = socio.diasMora > 15;
    }

    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredDeudores.length / itemsPerPage);
  const paginatedDeudores = filteredDeudores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

      {/* Panel de Métricas de Mora (KPIs) */}
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

      {/* Filtros y Búsqueda */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-end mb-4">
        {/* Pestañas (Tabs) */}
        <div className="flex space-x-6 border-b border-slate-200 dark:border-zinc-800 w-full md:w-auto overflow-x-auto scrollbar-hide">
          {['Todos', 'Mora Reciente (1-15 días)', 'Mora Crítica (+15 días)'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`pb-3 text-sm font-bold tracking-wide transition-colors cursor-pointer relative whitespace-nowrap border-b-4 ${
                activeTab === tab 
                  ? 'border-green-600 text-slate-900 dark:text-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Búsqueda */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input 
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Estilo de la Tabla */}
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
              {paginatedDeudores.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-zinc-500 text-sm font-medium">
                    No se encontraron resultados.
                  </td>
                </tr>
              ) : (
                paginatedDeudores.map((d) => (
                  <tr key={d.id} className="border-b border-slate-100 dark:border-zinc-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-[#1A1A1A] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={d.avatar} alt={d.nombre} className="w-8 h-8 rounded-full border border-slate-200 dark:border-zinc-700" />
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">{d.nombre}</p>
                          <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-bold ${d.plan.includes('Cross Training') ? 'bg-sky-100 text-sky-900 dark:bg-sky-900/30 dark:text-sky-300' : d.plan.includes('Musculación') ? 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-300' : 'bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-300'}`}>
                            {d.plan}
                          </span>
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
                      <p className="text-xs font-bold text-red-600 dark:text-red-500 mt-0.5">{d.vencimiento}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{d.monto}</p>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-500">{d.diasMora} días de mora</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedSocio(d)}
                        className="p-2 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white bg-slate-50 hover:bg-slate-200 dark:bg-[#0E0E0E] dark:hover:bg-zinc-800 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer" 
                        title="Ver Ficha"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#0E0E0E]">
            <span className="text-xs text-slate-500 dark:text-zinc-500 font-medium hidden sm:block">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredDeudores.length)} de {filteredDeudores.length} alumnos
            </span>
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === i + 1 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
                        : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Ficha de Alumno */}
      {selectedSocio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
          <div className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full relative shadow-2xl transition-colors">
            
            <button 
              onClick={() => setSelectedSocio(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col items-center mb-8 mt-2">
              <img src={selectedSocio.avatar} alt={selectedSocio.nombre} className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-zinc-800/50 mb-4 shadow-sm object-cover" />
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-wide">{selectedSocio.nombre}</h2>
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 mt-1">DNI: {selectedSocio.dni}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-[#0E0E0E] p-4 rounded-xl border border-slate-100 dark:border-zinc-800/50">
                <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest mb-1">Plan Activo</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedSocio.plan}</p>
              </div>

              <div className="bg-red-50 dark:bg-red-500/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-500" />
                  <p className="text-[10px] text-red-600 dark:text-red-500 font-bold uppercase tracking-widest">Resumen de Deuda</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-1">Monto a pagar</p>
                    <p className="text-xl font-black text-red-600 dark:text-red-500">{selectedSocio.monto}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-1">Días de atraso</p>
                    <p className="text-xl font-black text-red-600 dark:text-red-500">{selectedSocio.diasMora} días</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-900/30">
                  <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-1">Vencimiento Original</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedSocio.vencimiento.replace('Vencido (', '').replace(')', '')}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedSocio(null)}
              className="w-full mt-8 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
            >
              CERRAR FICHA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
