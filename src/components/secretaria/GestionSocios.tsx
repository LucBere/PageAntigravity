import { 
  Search, 
  Plus, 
  SlidersHorizontal, 
  RefreshCcw, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  Download, 
  Pencil, 
  Eye, 
  Power, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GestionSocios() {
  const navigate = useNavigate();

  const socios = [
    { id: 1, nombre: 'Marcos Paz', dni: '34.902.112', plan: 'Plan Musculación Full', estado: 'Activo', vencimiento: '12 Oct 2024', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, nombre: 'Julia Benitez', dni: '40.112.559', plan: 'Plan Cross Training', estado: 'Vencido', vencimiento: '05 Oct 2023', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, nombre: 'Ricardo Centurión', dni: '28.774.301', plan: 'Plan Personalizado', estado: 'Activo', vencimiento: '15 Oct 2024', avatar: 'RC', isInitials: true },
    { id: 4, nombre: 'Sofia Velazquez', dni: '42.880.122', plan: 'Plan Musculación', estado: 'Activo', vencimiento: '10 Oct 2024', avatar: 'https://i.pravatar.cc/150?img=9' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 1. Encabezado */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">GESTIÓN DE SOCIOS</h1>
        <p className="text-sm text-zinc-400 mt-1">Listado general y control de membresías activos del gimnasio.</p>
      </div>

      {/* 2. Barra de Herramientas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar socios por DNI, Nombre o Email..."
            className="w-full bg-[#151515] border border-zinc-800/80 rounded-full py-3 pl-12 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/secretaria/socios/nuevo')}
            className="flex items-center px-6 py-3 bg-zinc-800 hover:bg-[#7B8B9E] text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-[#7B8B9E]/20"
          >
            <Plus className="w-5 h-5 mr-2" />
            REGISTRO RÁPIDO
          </button>
          <button className="p-3 bg-[#151515] hover:bg-zinc-800 border border-zinc-800/80 rounded-xl transition-colors text-zinc-400 hover:text-white">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
          <button className="p-3 bg-[#151515] hover:bg-zinc-800 border border-zinc-800/80 rounded-xl transition-colors text-zinc-400 hover:text-white">
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. Sección KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 flex items-start justify-between">
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">SOCIOS TOTALES</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">2,450</span>
            </div>
            <p className="text-xs text-emerald-500 mt-1 font-medium">+15 hoy</p>
          </div>
          <div className="p-3 bg-zinc-800/50 rounded-xl">
            <Users className="w-6 h-6 text-[#7B8B9E]" />
          </div>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 flex items-start justify-between">
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">MEMBRESÍAS ACTIVAS</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">1,890</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">77% del total</p>
          </div>
          <div className="p-3 bg-zinc-800/50 rounded-xl">
            <CreditCard className="w-6 h-6 text-[#7B8B9E]" />
          </div>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 flex items-start justify-between">
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">PRÓXIMOS VENCIMIENTOS</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">142</span>
            </div>
            <p className="text-xs text-red-500 mt-1 font-medium">en los próximos 7 días</p>
          </div>
          <div className="p-3 bg-red-500/10 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>

      {/* 4. Tabla Principal */}
      <div className="bg-[#151515] rounded-xl border border-zinc-800/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80 text-xs text-zinc-500 uppercase tracking-widest bg-[#151515]">
                <th className="px-6 py-5 font-medium">NOMBRE SOCIO</th>
                <th className="px-6 py-5 font-medium">DNI</th>
                <th className="px-6 py-5 font-medium">PLAN</th>
                <th className="px-6 py-5 font-medium">ESTADO</th>
                <th className="px-6 py-5 font-medium">VENCIMIENTO</th>
                <th className="px-6 py-5 font-medium">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {socios.map((socio) => (
                <tr key={socio.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      {socio.isInitials ? (
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300">
                          {socio.avatar}
                        </div>
                      ) : (
                        <img src={socio.avatar} alt={socio.nombre} className="w-10 h-10 rounded-full border border-zinc-700 object-cover" />
                      )}
                      <div>
                        <p className="text-sm font-bold text-white">{socio.nombre}</p>
                        <p className="text-xs text-zinc-500">Miembro Estándar</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-white">{socio.dni}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-sm text-zinc-300">{socio.plan}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {socio.estado === 'Activo' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                        ACTIVO
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
                        VENCIDO
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-white">{socio.vencimiento}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors" title="Ver Detalle">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-colors" title="Desactivar">
                        <Power className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Footer de la Tabla */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8">
        <button className="flex items-center px-4 py-2.5 bg-[#151515] hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 text-sm font-medium rounded-xl transition-colors">
          <Download className="w-4 h-4 mr-2" />
          DESCARGAR LISTADO SOCIOS
        </button>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-[#151515] border border-zinc-800/80 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#7B8B9E] text-white font-bold text-sm shadow-lg shadow-[#7B8B9E]/20">
            1
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#151515] border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium">
            2
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#151515] border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium">
            3
          </button>
          <span className="text-zinc-500 px-1">...</span>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#151515] border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium">
            12
          </button>
          <button className="p-2 rounded-lg bg-[#151515] border border-zinc-800/80 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
