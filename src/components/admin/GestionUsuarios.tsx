import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const mockUsers = [
  { id: 1, name: 'Marcus Thorne', email: 'm.thorne@squatgym.com', role: 'Administrador', status: 'ACTIVO', lastConnection: 'Hace 5 minutos', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Elena Rodriguez', email: 'e.rodriguez@squatgym.com', role: 'Profesor', status: 'ACTIVO', lastConnection: 'Ayer, 18:45', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Julian Vane', email: 'j.vane@squatgym.com', role: 'Recepcionista', status: 'INACTIVO', lastConnection: '12 Oct, 2023', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Sarah Connor', email: 's.connor@squatgym.com', role: 'Administrador', status: 'ACTIVO', lastConnection: 'Hoy, 09:12', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'David Miller', email: 'd.miller@squatgym.com', role: 'Profesor', status: 'ACTIVO', lastConnection: 'Hace 2 horas', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Ana Silva', email: 'a.silva@squatgym.com', role: 'Recepcionista', status: 'ACTIVO', lastConnection: 'Hace 1 hora', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, name: 'Carlos Gomez', email: 'c.gomez@squatgym.com', role: 'Profesor', status: 'INACTIVO', lastConnection: '01 Nov, 2023', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Lucia Fernandez', email: 'l.fernandez@squatgym.com', role: 'Administrador', status: 'ACTIVO', lastConnection: 'Hoy, 10:30', avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, name: 'Martin Lopez', email: 'm.lopez@squatgym.com', role: 'Profesor', status: 'ACTIVO', lastConnection: 'Ayer, 20:15', avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 10, name: 'Sofia Martinez', email: 's.martinez@squatgym.com', role: 'Recepcionista', status: 'ACTIVO', lastConnection: 'Hace 30 minutos', avatar: 'https://i.pravatar.cc/150?u=10' },
  { id: 11, name: 'Pedro Sanchez', email: 'p.sanchez@squatgym.com', role: 'Profesor', status: 'ACTIVO', lastConnection: 'Hoy, 14:00', avatar: 'https://i.pravatar.cc/150?u=11' },
  { id: 12, name: 'Maria Torres', email: 'm.torres@squatgym.com', role: 'Administrador', status: 'INACTIVO', lastConnection: '15 Sep, 2023', avatar: 'https://i.pravatar.cc/150?u=12' },
  { id: 13, name: 'Jorge Ruiz', email: 'j.ruiz@squatgym.com', role: 'Profesor', status: 'ACTIVO', lastConnection: 'Ayer, 08:45', avatar: 'https://i.pravatar.cc/150?u=13' },
  { id: 14, name: 'Laura Vargas', email: 'l.vargas@squatgym.com', role: 'Recepcionista', status: 'ACTIVO', lastConnection: 'Hace 10 minutos', avatar: 'https://i.pravatar.cc/150?u=14' },
  { id: 15, name: 'Diego Castro', email: 'd.castro@squatgym.com', role: 'Profesor', status: 'ACTIVO', lastConnection: 'Hoy, 16:20', avatar: 'https://i.pravatar.cc/150?u=15' },
  { id: 16, name: 'Carmen Ortiz', email: 'c.ortiz@squatgym.com', role: 'Administrador', status: 'ACTIVO', lastConnection: 'Hace 4 horas', avatar: 'https://i.pravatar.cc/150?u=16' },
  { id: 17, name: 'Raul Jimenez', email: 'r.jimenez@squatgym.com', role: 'Profesor', status: 'INACTIVO', lastConnection: '20 Oct, 2023', avatar: 'https://i.pravatar.cc/150?u=17' },
  { id: 18, name: 'Patricia Vega', email: 'p.vega@squatgym.com', role: 'Recepcionista', status: 'ACTIVO', lastConnection: 'Hoy, 11:10', avatar: 'https://i.pravatar.cc/150?u=18' },
  { id: 19, name: 'Andres Rios', email: 'a.rios@squatgym.com', role: 'Profesor', status: 'ACTIVO', lastConnection: 'Ayer, 19:30', avatar: 'https://i.pravatar.cc/150?u=19' },
  { id: 20, name: 'Marta Diaz', email: 'm.diaz@squatgym.com', role: 'Administrador', status: 'ACTIVO', lastConnection: 'Hace 1 hora', avatar: 'https://i.pravatar.cc/150?u=20' },
];

export default function GestionUsuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const navigate = useNavigate();

  // Filtrado de usuarios
  const usuariosFiltrados = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.role.toLowerCase().includes(searchTerm.toLowerCase());
                          
    let matchesFilter = true;
    switch (filtroActivo) {
      case 'Solo Activos':
        matchesFilter = user.status === 'ACTIVO';
        break;
      case 'Solo Inactivos':
        matchesFilter = user.status === 'INACTIVO';
        break;
      case 'Rol: Administrador':
        matchesFilter = user.role === 'Administrador';
        break;
      case 'Rol: Profesor':
        matchesFilter = user.role === 'Profesor';
        break;
      case 'Rol: Recepcionista':
        matchesFilter = user.role === 'Recepcionista';
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  // Paginación
  const USERS_PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(usuariosFiltrados.length / USERS_PER_PAGE));

  useEffect(() => {
    if (paginaActual > totalPages) {
      setPaginaActual(1);
    }
  }, [usuariosFiltrados.length, paginaActual, totalPages]);

  const currentUsers = usuariosFiltrados.slice(
    (paginaActual - 1) * USERS_PER_PAGE,
    paginaActual * USERS_PER_PAGE
  );

  const startItem = usuariosFiltrados.length === 0 ? 0 : (paginaActual - 1) * USERS_PER_PAGE + 1;
  const endItem = Math.min(paginaActual * USERS_PER_PAGE, usuariosFiltrados.length);

  const handlePrevPage = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handleNextPage = () => {
    if (paginaActual < totalPages) setPaginaActual(paginaActual + 1);
  };

  const handlePageChange = (page: number) => {
    setPaginaActual(page);
  };

  const renderPageButton = (page: number) => {
    const isActive = paginaActual === page;
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

  const filterOptions = [
    "Todos", "Solo Activos", "Solo Inactivos", "Rol: Administrador", "Rol: Profesor", "Rol: Recepcionista"
  ];

  // Exportación PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("SquatGym - Reporte de Personal", 14, 22);
    
    const tableColumn = ["Nombre", "Rol", "Email", "Estado"];
    const tableRows = usuariosFiltrados.map(user => [
      user.name,
      user.role,
      user.email,
      user.status
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [27, 27, 27], textColor: [255, 255, 255] }
    });

    doc.save("Usuarios_SquatGym.pdf");
  };

  // KPIs
  const totalPersonal = mockUsers.length;
  const personalActivo = mockUsers.filter(u => u.status === 'ACTIVO').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[2rem] font-bold text-[#FAFAFA] tracking-wide mb-1 uppercase">GESTIÓN DE USUARIO</h2>
          <p className="text-zinc-400 text-sm">Listado general de usuarios y personal del sistema</p>
        </div>
        <button 
          onClick={() => navigate('/admin/usuarios/nuevo')}
          className="flex items-center space-x-2 bg-[#7B8B9E] hover:bg-slate-400 text-[#FAFAFA] px-6 py-3.5 rounded-lg font-bold text-[11px] uppercase tracking-widest transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1" />
          <span>NUEVO USUARIO</span>
        </button>
      </div>

      {/* 2. Barra de Herramientas */}
      <div className="flex items-center gap-4 relative">
        <div className="flex-grow relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, cargo o rol..."
            className="w-full bg-[#151515] border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-[#FAFAFA] placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className={`p-3 border rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${isFilterMenuOpen || filtroActivo !== 'Todos' ? 'bg-zinc-800 border-zinc-600 text-[#FAFAFA]' : 'bg-[#151515] border-zinc-800 text-zinc-400 hover:text-[#FAFAFA] hover:bg-zinc-800 hover:border-zinc-600'}`}
          >
            <Filter className="w-4 h-4" />
            {filtroActivo !== 'Todos' && <span className="text-xs font-medium">{filtroActivo}</span>}
          </button>
          
          {isFilterMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1A1A1A] border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="py-1">
                {filterOptions.map((opcion) => (
                  <button
                    key={opcion}
                    onClick={() => {
                      setFiltroActivo(opcion);
                      setIsFilterMenuOpen(false);
                      setPaginaActual(1);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-zinc-800 transition-colors ${filtroActivo === opcion ? 'text-[#FAFAFA] bg-zinc-800/50' : 'text-zinc-400'}`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={handleDownloadPDF}
          className="p-3 bg-[#151515] border border-zinc-800 rounded-xl text-zinc-400 hover:text-[#FAFAFA] hover:bg-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Tabla Principal */}
      <div className="bg-[#151515] border border-zinc-800 rounded-xl overflow-hidden min-h-[400px] flex flex-col">
        <div className="overflow-x-auto flex-grow">
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
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-zinc-500 text-sm">
                    No se encontraron usuarios que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-8 py-5 flex items-center justify-between border-t border-zinc-800 bg-[#151515] mt-auto">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            MOSTRANDO {startItem}-{endItem} DE {usuariosFiltrados.length}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              <button 
                onClick={handlePrevPage}
                disabled={paginaActual === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0E0E0E] border border-zinc-800/50 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => renderPageButton(page))}

              <button 
                onClick={handleNextPage}
                disabled={paginaActual === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0E0E0E] border border-zinc-800/50 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Tarjetas KPI */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#151515] border border-zinc-800 rounded-xl p-6">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">TOTAL PERSONAL</p>
          <p className="text-4xl font-normal text-[#FAFAFA]">{totalPersonal}</p>
        </div>
        {/* highlighted card */}
        <div className="bg-[#151515] border border-[#7B8B9E] rounded-xl p-6 shadow-[0_0_20px_rgba(123,139,158,0.08)]">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">PERSONAL ACTIVO</p>
          <p className="text-4xl font-normal text-[#FAFAFA]">{personalActivo}</p>
        </div>
        <div className="bg-[#151515] border border-zinc-800 rounded-xl p-6">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">SOLICITUDES PENDIENTES</p>
          <p className="text-4xl font-normal text-[#FAFAFA]">03</p>
        </div>
      </div>
    </div>
  );
}
