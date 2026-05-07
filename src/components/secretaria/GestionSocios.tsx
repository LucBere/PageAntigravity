import { 
  Search, 
  UserPlus, 
  CreditCard,
  ListFilter,
  MoreVertical,
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GestionSocios() {
  const navigate = useNavigate();

  const socios = [
    { 
      id: 1, 
      nombre: 'Marcos Paz', 
      dni: '34.902.112', 
      plan: 'Plan Musculación Full', 
      ultimoPago: '12 Oct, 2023', 
      vencido: false,
      estado: 'HABILITADO', 
      avatar: 'https://i.pravatar.cc/150?u=marcos' 
    },
    { 
      id: 2, 
      nombre: 'Julia Benitez', 
      dni: '40.112.559', 
      plan: 'Plan Cross Training', 
      ultimoPago: 'Vencido (05 Oct)', 
      vencido: true,
      estado: 'DEUDOR', 
      avatar: 'https://i.pravatar.cc/150?u=julia' 
    },
    { 
      id: 3, 
      nombre: 'Ricardo Centurión', 
      dni: '28.774.301', 
      plan: 'Plan Personalizado', 
      ultimoPago: '15 Oct, 2023', 
      vencido: false,
      estado: 'HABILITADO', 
      avatar: 'RC', 
      isInitials: true 
    },
    { 
      id: 4, 
      nombre: 'Sofía Velazquez', 
      dni: '42.880.122', 
      plan: 'Plan Musculación', 
      ultimoPago: '10 Oct, 2023', 
      vencido: false,
      estado: 'HABILITADO', 
      avatar: 'https://i.pravatar.cc/150?u=sofia' 
    },
  ];

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
          <div className="flex items-center gap-6 overflow-x-auto w-full sm:w-auto">
            <button className="px-5 py-1.5 bg-[#7B8B9E] text-white text-xs font-bold rounded-full tracking-widest shadow-lg shadow-[#7B8B9E]/20 shrink-0">
              TODOS
            </button>
            <button className="text-xs font-bold text-zinc-500 hover:text-zinc-300 tracking-widest transition-colors shrink-0">
              DEUDORES
            </button>
            <button className="text-xs font-bold text-zinc-500 hover:text-zinc-300 tracking-widest transition-colors shrink-0">
              HABILITADOS
            </button>
          </div>
          <button className="flex items-center text-xs font-bold text-zinc-500 hover:text-zinc-300 tracking-widest transition-colors shrink-0">
            <ListFilter className="w-4 h-4 mr-2" />
            FILTROS AVANZADOS
          </button>
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
                {socios.map((socio) => (
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
              MOSTRANDO 4 DE 1.250 SOCIOS
            </span>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent text-[#7B8B9E] font-bold text-xs transition-colors">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent text-zinc-500 hover:text-white font-bold text-xs transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent text-zinc-500 hover:text-white font-bold text-xs transition-colors">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
