import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Marcus Thorne',
    email: 'm.thorne@kinetic.lab',
    role: 'Administrador',
    status: 'ACTIVO',
    lastConnection: 'Hace 5 minutos',
    avatar: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    email: 'e.rodriguez@kinetic.lab',
    role: 'Profesor\nSenior',
    status: 'ACTIVO',
    lastConnection: 'Ayer, 18:45',
    avatar: 'https://i.pravatar.cc/150?u=2'
  },
  {
    id: 3,
    name: 'Julian Vane',
    email: 'j.vane@kinetic.lab',
    role: 'Recepcionista',
    status: 'INACTIVO',
    lastConnection: '12 Oct, 2023',
    avatar: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: 4,
    name: 'Sarah Connor',
    email: 's.connor@kinetic.lab',
    role: 'Administrador',
    status: 'ACTIVO',
    lastConnection: 'Hoy, 09:12',
    avatar: 'https://i.pravatar.cc/150?u=4'
  },
  {
    id: 5,
    name: 'David Miller',
    email: 'd.miller@kinetic.lab',
    role: 'Profesor',
    status: 'ACTIVO',
    lastConnection: 'Hace 2 horas',
    avatar: 'https://i.pravatar.cc/150?u=5'
  }
];

export default function GestionUsuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // 1. Manejo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log("Buscando:", value);
  };

  // 2. Manejo de paginación
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < 16) setCurrentPage(currentPage + 1);
  };

  // Helper render para los botones de paginación
  const renderPageButton = (page: number | string) => {
    if (typeof page === 'string') {
      return <span key={page} className="w-8 h-8 flex items-center justify-center text-zinc-600 text-xs tracking-widest">{page}</span>;
    }
    
    const isActive = currentPage === page;
    return (
      <button 
        key={page}
        onClick={() => handlePageChange(page)}
        className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium text-xs transition-colors cursor-pointer ${
          isActive 
            ? 'bg-[#7B8B9E] text-white' 
            : 'hover:bg-zinc-800 text-zinc-400'
        }`}
      >
        {page}
      </button>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[2rem] font-bold text-[#FAFAFA] tracking-wide mb-1 uppercase">GESTIÓN DE USUARIO</h2>
          <p className="text-zinc-400 text-sm">Listado general de usuarios y personal del sistema</p>
        </div>
        {/* NO TOCAR SEGÚN REGLA ESTRICTA (excepto para agregar onClick) */}
        <button 
          onClick={() => navigate('/admin/usuarios/nuevo')}
          className="flex items-center space-x-2 bg-[#7B8B9E] hover:bg-slate-400 text-[#FAFAFA] px-6 py-3.5 rounded-lg font-bold text-[11px] uppercase tracking-widest transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" />
          <span>NUEVO USUARIO</span>
        </button>
      </div>

      {/* 2. Barra de Herramientas */}
      <div className="flex items-center gap-4">
        <div className="flex-grow relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre, cargo o rol..."
            className="w-full bg-[#151515] border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-[#FAFAFA] placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        <button 
          onClick={() => alert("Abriendo panel de filtros avanzados...")}
          className="p-3 bg-[#151515] border border-zinc-800 rounded-xl text-zinc-400 hover:text-[#FAFAFA] hover:bg-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
        >
          <Filter className="w-4 h-4" />
        </button>
        <button 
          onClick={() => alert("Generando reporte CSV...")}
          className="p-3 bg-[#151515] border border-zinc-800 rounded-xl text-zinc-400 hover:text-[#FAFAFA] hover:bg-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Tabla Principal */}
      <div className="bg-[#151515] border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-800">NOMBRE</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-800">ROL</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-800">ESTADO</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-800">ÚLTIMA CONEXIÓN</th>
                <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-800 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-zinc-800/50 hover:bg-white/[0.02] transition-colors last:border-0">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-zinc-800" />
                      <div>
                        <p className="text-sm font-bold text-[#FAFAFA] leading-tight">{user.name}</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs text-[#FAFAFA] whitespace-pre-line leading-snug">{user.role}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                      user.status === 'ACTIVO' 
                        ? 'bg-[#1B2A1E]/80 border-[#234A2E] text-[#4ADE80]' 
                        : 'bg-[#2A2A2A]/80 border-zinc-700 text-zinc-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${user.status === 'ACTIVO' ? 'bg-[#4ADE80]' : 'bg-zinc-400'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-xs text-zinc-400">
                    {user.lastConnection}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end space-x-4 text-zinc-500">
                      <button 
                        onClick={() => navigate('/admin/usuarios/editar')}
                        className="hover:text-[#7B8B9E] transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => confirm("¿Estás seguro que deseas deshabilitar a " + user.name + "?")}
                        className="hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-8 py-5 flex items-center justify-between border-t border-zinc-800 bg-[#151515]">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">MOSTRANDO 1-10 DE 154</p>
          <div className="flex items-center space-x-1">
            <button 
              onClick={handlePrevPage}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0E0E0E] border border-zinc-800/50 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {renderPageButton(1)}
            {renderPageButton(2)}
            {renderPageButton(3)}
            {renderPageButton('...')}
            {renderPageButton(16)}

            <button 
              onClick={handleNextPage}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0E0E0E] border border-zinc-800/50 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Tarjetas KPI */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#151515] border border-zinc-800 rounded-xl p-6">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">TOTAL PERSONAL</p>
          <p className="text-4xl font-normal text-[#FAFAFA]">154</p>
        </div>
        {/* highlighted card */}
        <div className="bg-[#151515] border border-[#7B8B9E] rounded-xl p-6 shadow-[0_0_20px_rgba(123,139,158,0.08)]">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">PERSONAL ACTIVO</p>
          <p className="text-4xl font-normal text-[#FAFAFA]">142</p>
        </div>
        <div className="bg-[#151515] border border-zinc-800 rounded-xl p-6">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">SOLICITUDES PENDIENTES</p>
          <p className="text-4xl font-normal text-[#FAFAFA]">03</p>
        </div>
      </div>
    </div>
  );
}
