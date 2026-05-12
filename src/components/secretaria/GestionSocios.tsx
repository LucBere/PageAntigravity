import { 
  Search, 
  UserPlus, 
  CreditCard,
  ListFilter,
  MoreVertical,
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockSocios = [
  { 
    id: 1, nombre: 'Marcos Paz', dni: '34.902.112', plan: 'Plan Musculación Full', ultimoPago: '12 Oct, 2023', vencido: false, estado: 'HABILITADO', avatar: 'https://i.pravatar.cc/150?u=marcos' 
  },
  { 
    id: 2, nombre: 'Julia Benitez', dni: '40.112.559', plan: 'Plan Cross Training', ultimoPago: 'Vencido (05 Oct)', vencido: true, estado: 'DEUDOR', avatar: 'https://i.pravatar.cc/150?u=julia' 
  },
  { 
    id: 3, nombre: 'Ricardo Centurión', dni: '28.774.301', plan: 'Plan Personalizado', ultimoPago: '15 Oct, 2023', vencido: false, estado: 'HABILITADO', avatar: 'RC', isInitials: true 
  },
  { 
    id: 4, nombre: 'Sofía Velazquez', dni: '42.880.122', plan: 'Plan Musculación', ultimoPago: '10 Oct, 2023', vencido: false, estado: 'HABILITADO', avatar: 'https://i.pravatar.cc/150?u=sofia' 
  },
  { 
    id: 5, nombre: 'Lucas Gomez', dni: '35.441.221', plan: 'Pase Libre', ultimoPago: '01 Nov, 2023', vencido: false, estado: 'HABILITADO', avatar: 'https://i.pravatar.cc/150?u=lucas' 
  },
  { 
    id: 6, nombre: 'Micaela Suarez', dni: '39.882.114', plan: 'Plan Musculación', ultimoPago: 'Vencido (20 Sep)', vencido: true, estado: 'DEUDOR', avatar: 'MS', isInitials: true
  },
  { 
    id: 7, nombre: 'Tomás Aquino', dni: '41.203.491', plan: 'Plan Cross Training', ultimoPago: '05 Nov, 2023', vencido: false, estado: 'HABILITADO', avatar: 'https://i.pravatar.cc/150?u=tomas' 
  },
  { 
    id: 8, nombre: 'Valentina Rios', dni: '38.102.993', plan: 'Plan Personalizado', ultimoPago: 'Vencido (10 Oct)', vencido: true, estado: 'DEUDOR', avatar: 'https://i.pravatar.cc/150?u=valentina' 
  },
  { 
    id: 9, nombre: 'Juan Perez', dni: '32.114.552', plan: 'Plan Musculación Full', ultimoPago: '02 Nov, 2023', vencido: false, estado: 'HABILITADO', avatar: 'JP', isInitials: true 
  },
  { 
    id: 10, nombre: 'Camila Torres', dni: '43.001.229', plan: 'Pase Libre', ultimoPago: 'Vencido (25 Oct)', vencido: true, estado: 'DEUDOR', avatar: 'https://i.pravatar.cc/150?u=camila' 
  },
  { 
    id: 11, nombre: 'Gonzalo Martinez', dni: '37.881.002', plan: 'Plan Cross Training', ultimoPago: '08 Nov, 2023', vencido: false, estado: 'HABILITADO', avatar: 'https://i.pravatar.cc/150?u=gonzalo' 
  },
  { 
    id: 12, nombre: 'Lucía Fernández', dni: '36.992.118', plan: 'Plan Musculación', ultimoPago: 'Vencido (01 Nov)', vencido: true, estado: 'DEUDOR', avatar: 'https://i.pravatar.cc/150?u=lucia' 
  }
];

export default function GestionSocios() {
  const navigate = useNavigate();
  
  const [filtroActivo, setFiltroActivo] = useState<'TODOS' | 'DEUDORES' | 'HABILITADOS'>('TODOS');
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [criterioOrden, setCriterioOrden] = useState<string>('defecto');

  const handleFiltroClick = (filtro: 'TODOS' | 'DEUDORES' | 'HABILITADOS') => {
    setFiltroActivo(filtro);
    setPaginaActual(1);
  };

  const parseFecha = (fechaStr: string) => {
    if (fechaStr.includes('Vencido')) return 0;
    return new Date(fechaStr).getTime();
  };

  const sociosFiltrados = mockSocios
    .filter(socio => {
      if (filtroActivo === 'TODOS') return true;
      if (filtroActivo === 'DEUDORES') return socio.estado === 'DEUDOR';
      if (filtroActivo === 'HABILITADOS') return socio.estado === 'HABILITADO';
      return true;
    })
    .sort((a, b) => {
      if (criterioOrden === 'nombre') {
        return a.nombre.localeCompare(b.nombre);
      }
      if (criterioOrden === 'fecha') {
        return parseFecha(b.ultimoPago) - parseFecha(a.ultimoPago);
      }
      if (criterioOrden === 'plan') {
        return a.plan.localeCompare(b.plan);
      }
      return 0;
    });

  const sociosPorPagina = 4;
  const totalPaginas = Math.ceil(sociosFiltrados.length / sociosPorPagina);
  const indiceInicial = (paginaActual - 1) * sociosPorPagina;
  const sociosPaginados = sociosFiltrados.slice(indiceInicial, indiceInicial + sociosPorPagina);

  const getFiltroClass = (filtro: string) => {
    return filtroActivo === filtro 
      ? "px-5 py-1.5 bg-[#7B8B9E] text-white text-xs font-bold rounded-full tracking-widest shadow-lg shadow-[#7B8B9E]/20 shrink-0 transition-colors" 
      : "px-5 py-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-300 tracking-widest transition-colors shrink-0";
  };

  return (
    <div className="bg-[#0E0E0E] min-h-full p-8 font-sans text-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Encabezado Principal */}
        <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase mb-8">
          GESTIÓN DE SOCIOS
        </h1>

        {/* 2. Barra de Acciones y Búsqueda */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => navigate('/secretaria/socios/nuevo')}
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-[#7B8B9E] hover:bg-[#687a8e] text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-[#7B8B9E]/20"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              NUEVO SOCIO
            </button>
            <button 
              onClick={() => navigate('/secretaria/pago')}
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-transparent border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white text-sm font-bold rounded-xl transition-colors"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              REGISTRAR PAGO
            </button>
          </div>
          
          <div className="relative w-full md:max-w-md">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Búsqueda rápida por nombre o DNI..."
              className="w-full bg-[#151515] rounded-full py-3 pl-12 pr-4 text-sm text-zinc-200 placeholder-zinc-500 border border-zinc-800/50 focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </div>
        </div>

        {/* 3. Barra de Pestañas / Filtros */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 mb-6 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <button 
              onClick={() => handleFiltroClick('TODOS')}
              className={getFiltroClass('TODOS')}
            >
              TODOS
            </button>
            <button 
              onClick={() => handleFiltroClick('DEUDORES')}
              className={getFiltroClass('DEUDORES')}
            >
              DEUDORES
            </button>
            <button 
              onClick={() => handleFiltroClick('HABILITADOS')}
              className={getFiltroClass('HABILITADOS')}
            >
              HABILITADOS
            </button>
          </div>
          <div className="relative">
            <button 
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center text-xs font-bold text-zinc-500 hover:text-zinc-300 tracking-widest transition-colors shrink-0"
            >
              <ListFilter className="w-4 h-4 mr-2" />
              FILTROS AVANZADOS
            </button>
            
            {mostrarFiltros && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1A1A1A] border border-zinc-800 rounded-xl shadow-xl z-10 py-2">
                <button 
                  onClick={() => { setCriterioOrden('nombre'); setMostrarFiltros(false); }}
                  className={`w-full text-left px-4 py-2 hover:bg-zinc-800 text-sm transition-colors ${criterioOrden === 'nombre' ? 'text-[#7B8B9E] font-bold' : 'text-zinc-300'}`}
                >
                  Ordenar por Nombre (A-Z)
                </button>
                <button 
                  onClick={() => { setCriterioOrden('fecha'); setMostrarFiltros(false); }}
                  className={`w-full text-left px-4 py-2 hover:bg-zinc-800 text-sm transition-colors ${criterioOrden === 'fecha' ? 'text-[#7B8B9E] font-bold' : 'text-zinc-300'}`}
                >
                  Ordenar por Último Pago
                </button>
                <button 
                  onClick={() => { setCriterioOrden('plan'); setMostrarFiltros(false); }}
                  className={`w-full text-left px-4 py-2 hover:bg-zinc-800 text-sm transition-colors ${criterioOrden === 'plan' ? 'text-[#7B8B9E] font-bold' : 'text-zinc-300'}`}
                >
                  Filtrar por Plan
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. Tabla Principal */}
        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 shadow-xl shadow-black/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-zinc-800/80 text-[10px] text-zinc-500 uppercase tracking-widest">
                  <th className="pb-4 font-bold">SOCIO</th>
                  <th className="pb-4 font-bold">DNI / ID</th>
                  <th className="pb-4 font-bold">ÚLTIMO PAGO</th>
                  <th className="pb-4 font-bold">ESTADO</th>
                  <th className="pb-4 font-bold text-right pr-4">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {sociosPaginados.map((socio) => (
                  <tr key={socio.id} className="hover:bg-zinc-800/20 transition-colors">
                    {/* SOCIO */}
                    <td className="py-5 pr-4">
                      <div className="flex items-center space-x-4">
                        {socio.isInitials ? (
                          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 shrink-0 border border-zinc-700/50">
                            {socio.avatar}
                          </div>
                        ) : (
                          <img src={socio.avatar} alt={socio.nombre} className="w-12 h-12 rounded-full border border-zinc-700/50 object-cover shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-bold text-white mb-0.5">{socio.nombre}</p>
                          <p className="text-[11px] font-medium text-zinc-500">{socio.plan}</p>
                        </div>
                      </div>
                    </td>
                    {/* DNI / ID */}
                    <td className="py-5 pr-4">
                      <span className="text-xs font-bold text-zinc-400">{socio.dni}</span>
                    </td>
                    {/* ÚLTIMO PAGO */}
                    <td className="py-5 pr-4">
                      <span className={`text-xs font-bold ${socio.vencido ? 'text-[#EF4444]' : 'text-zinc-400'}`}>
                        {socio.ultimoPago}
                      </span>
                    </td>
                    {/* ESTADO */}
                    <td className="py-5 pr-4">
                      {socio.estado === 'HABILITADO' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-zinc-950 text-zinc-300 border border-zinc-800/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mr-2"></span>
                          HABILITADO
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-[#2A1111] text-[#EF4444] border border-[#EF4444]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mr-2"></span>
                          DEUDOR
                        </span>
                      )}
                    </td>
                    {/* ACCIONES */}
                    <td className="py-5 text-right pr-4">
                      <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 5. Footer de la Tabla */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 mt-2 gap-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              MOSTRANDO {sociosPaginados.length} DE {sociosFiltrados.length} SOCIOS
            </span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
                disabled={paginaActual === 1}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
                  paginaActual === 1 
                    ? 'bg-transparent border-transparent text-zinc-700 cursor-not-allowed' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(pag => (
                <button 
                  key={pag}
                  onClick={() => setPaginaActual(pag)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-xs transition-colors ${
                    paginaActual === pag
                      ? 'bg-transparent text-[#7B8B9E]'
                      : 'bg-transparent text-zinc-500 hover:text-white'
                  }`}
                >
                  {pag}
                </button>
              ))}

              <button 
                onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
                disabled={paginaActual === totalPaginas || totalPaginas === 0}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
                  paginaActual === totalPaginas || totalPaginas === 0
                    ? 'bg-transparent border-transparent text-zinc-700 cursor-not-allowed' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
