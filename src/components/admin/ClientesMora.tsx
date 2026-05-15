import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, ArrowLeft, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock data (20 objects)
const mockMorosos = [
  { id: 1, avatar: 'https://i.pravatar.cc/150?u=a1', alumno: 'Lucía Fernández', dni: '38.452.910', plan: 'Musculación', planColor: 'bg-red-900/30 text-red-400', diasMora: 45, montoAdeudado: 14200, alerta: 'NOTIFICADO' },
  { id: 2, avatar: 'https://i.pravatar.cc/150?u=a2', alumno: 'Marcos Rossi', dni: '41.201.033', plan: 'Cross Training', planColor: 'bg-orange-900/30 text-orange-400', diasMora: 12, montoAdeudado: 8500, alerta: 'PENDIENTE' },
  { id: 3, avatar: 'https://i.pravatar.cc/150?u=a3', alumno: 'Sofía Méndez', dni: '35.981.222', plan: 'Pase Libre', planColor: 'bg-green-900/30 text-green-400', diasMora: 62, montoAdeudado: 22400, alerta: 'NOTIFICADO' },
  { id: 4, avatar: 'https://i.pravatar.cc/150?u=a4', alumno: 'Mateo Gómez', dni: '40.112.553', plan: 'Musculación', planColor: 'bg-red-900/30 text-red-400', diasMora: 8, montoAdeudado: 12400, alerta: 'PENDIENTE' },
  { id: 5, avatar: 'https://i.pravatar.cc/150?u=a5', alumno: 'Valentina Ortiz', dni: '39.882.112', plan: 'Cross Training', planColor: 'bg-orange-900/30 text-orange-400', diasMora: 35, montoAdeudado: 9800, alerta: 'NOTIFICADO' },
  { id: 6, avatar: 'https://i.pravatar.cc/150?u=a6', alumno: 'Joaquin Silva', dni: '42.333.111', plan: 'Pase Libre', planColor: 'bg-green-900/30 text-green-400', diasMora: 95, montoAdeudado: 35000, alerta: 'SUSPENDIDO' },
  { id: 7, avatar: 'https://i.pravatar.cc/150?u=a7', alumno: 'Carla Ruiz', dni: '37.444.222', plan: 'Musculación', planColor: 'bg-red-900/30 text-red-400', diasMora: 20, montoAdeudado: 7500, alerta: 'PENDIENTE' },
  { id: 8, avatar: 'https://i.pravatar.cc/150?u=a8', alumno: 'Pedro Martínez', dni: '36.555.333', plan: 'Cross Training', planColor: 'bg-orange-900/30 text-orange-400', diasMora: 40, montoAdeudado: 10500, alerta: 'NOTIFICADO' },
  { id: 9, avatar: 'https://i.pravatar.cc/150?u=a9', alumno: 'Laura Gómez', dni: '43.666.444', plan: 'Pase Libre', planColor: 'bg-green-900/30 text-green-400', diasMora: 75, montoAdeudado: 25000, alerta: 'SUSPENDIDO' },
  { id: 10, avatar: 'https://i.pravatar.cc/150?u=a10', alumno: 'Diego Torres', dni: '34.777.555', plan: 'Musculación', planColor: 'bg-red-900/30 text-red-400', diasMora: 15, montoAdeudado: 5000, alerta: 'PENDIENTE' },
  { id: 11, avatar: 'https://i.pravatar.cc/150?u=a11', alumno: 'Camila Ríos', dni: '39.888.666', plan: 'Cross Training', planColor: 'bg-orange-900/30 text-orange-400', diasMora: 100, montoAdeudado: 40000, alerta: 'SUSPENDIDO' },
  { id: 12, avatar: 'https://i.pravatar.cc/150?u=a12', alumno: 'Andrés Castro', dni: '40.999.777', plan: 'Pase Libre', planColor: 'bg-green-900/30 text-green-400', diasMora: 50, montoAdeudado: 18000, alerta: 'NOTIFICADO' },
  { id: 13, avatar: 'https://i.pravatar.cc/150?u=a13', alumno: 'Florencia Luna', dni: '38.111.888', plan: 'Musculación', planColor: 'bg-red-900/30 text-red-400', diasMora: 25, montoAdeudado: 8000, alerta: 'PENDIENTE' },
  { id: 14, avatar: 'https://i.pravatar.cc/150?u=a14', alumno: 'Santiago Vega', dni: '37.222.999', plan: 'Cross Training', planColor: 'bg-orange-900/30 text-orange-400', diasMora: 65, montoAdeudado: 21000, alerta: 'NOTIFICADO' },
  { id: 15, avatar: 'https://i.pravatar.cc/150?u=a15', alumno: 'Martina Paz', dni: '41.333.000', plan: 'Pase Libre', planColor: 'bg-green-900/30 text-green-400', diasMora: 5, montoAdeudado: 2000, alerta: 'PENDIENTE' },
  { id: 16, avatar: 'https://i.pravatar.cc/150?u=a16', alumno: 'Tomás Herrero', dni: '36.444.111', plan: 'Musculación', planColor: 'bg-red-900/30 text-red-400', diasMora: 80, montoAdeudado: 28000, alerta: 'SUSPENDIDO' },
  { id: 17, avatar: 'https://i.pravatar.cc/150?u=a17', alumno: 'Paula Blanco', dni: '35.555.222', plan: 'Cross Training', planColor: 'bg-orange-900/30 text-orange-400', diasMora: 110, montoAdeudado: 45000, alerta: 'SUSPENDIDO' },
  { id: 18, avatar: 'https://i.pravatar.cc/150?u=a18', alumno: 'Nicolás Rojas', dni: '42.666.333', plan: 'Pase Libre', planColor: 'bg-green-900/30 text-green-400', diasMora: 33, montoAdeudado: 12000, alerta: 'NOTIFICADO' },
  { id: 19, avatar: 'https://i.pravatar.cc/150?u=a19', alumno: 'Ana Medina', dni: '39.777.444', plan: 'Musculación', planColor: 'bg-red-900/30 text-red-400', diasMora: 55, montoAdeudado: 19000, alerta: 'NOTIFICADO' },
  { id: 20, avatar: 'https://i.pravatar.cc/150?u=a20', alumno: 'Esteban Cruz', dni: '38.888.555', plan: 'Cross Training', planColor: 'bg-orange-900/30 text-orange-400', diasMora: 18, montoAdeudado: 6000, alerta: 'PENDIENTE' },
];

export default function ClientesMora() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroDiasMora, setFiltroDiasMora] = useState('Todos');
  const [paginaActual, setPaginaActual] = useState(1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
  };

  // Filtering
  const clientesFiltrados = mockMorosos.filter(c => {
    const searchMatch = c.alumno.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.dni.includes(searchTerm);
    let diasMatch = true;
    if (filtroDiasMora === 'Más de 30 días') {
      diasMatch = c.diasMora > 30;
    } else if (filtroDiasMora === 'Más de 60 días') {
      diasMatch = c.diasMora > 60;
    } else if (filtroDiasMora === 'Crítico (+90 días)') {
      diasMatch = c.diasMora > 90;
    }
    return searchMatch && diasMatch;
  });

  // Pagination
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(clientesFiltrados.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (paginaActual > totalPages) setPaginaActual(1);
  }, [clientesFiltrados.length, paginaActual, totalPages]);

  const currentClients = clientesFiltrados.slice(
    (paginaActual - 1) * ITEMS_PER_PAGE,
    paginaActual * ITEMS_PER_PAGE
  );

  const startItem = clientesFiltrados.length === 0 ? 0 : (paginaActual - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(paginaActual * ITEMS_PER_PAGE, clientesFiltrados.length);

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

  // Exports
  const handleExportExcel = () => {
    const dataToExport = clientesFiltrados.map(c => ({
      Alumno: c.alumno,
      DNI: c.dni,
      Plan: c.plan,
      'Días de Mora': c.diasMora,
      'Monto Adeudado': c.montoAdeudado
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Morosos");
    XLSX.writeFile(workbook, "Clientes_Mora_SquatGym.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SquatGym - Reporte de Clientes en Mora", 14, 22);

    const tableColumn = ["Alumno", "DNI", "Plan", "Días de Mora", "Monto Adeudado"];
    const tableRows = clientesFiltrados.map(c => [
      c.alumno,
      c.dni,
      c.plan,
      c.diasMora.toString(),
      formatCurrency(c.montoAdeudado)
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [27, 27, 27], textColor: [255, 255, 255] }
    });

    doc.save("Clientes_Mora_SquatGym.pdf");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col h-full min-h-[calc(100vh-100px)]">
      {/* Encabezado */}
      <div>
        <h1 className="text-[3rem] font-black text-[#FAFAFA] tracking-tighter mb-2 uppercase leading-none">
          CLIENTES EN MORA
        </h1>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-zinc-400 text-sm">
            Listado detallado de <strong className="text-white">{clientesFiltrados.length} alumnos</strong> con deuda pendiente
          </span>
        </div>
      </div>

      {/* Barra de Herramientas (Filtros) */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-grow relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o DNI..."
            className="w-full bg-[#151515] border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-[#FAFAFA] placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        <select 
          value={filtroDiasMora}
          onChange={(e) => setFiltroDiasMora(e.target.value)}
          className="bg-[#151515] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-[#FAFAFA] focus:outline-none focus:border-zinc-600 appearance-none pr-10 cursor-pointer transition-colors"
        >
          <option value="Todos">Todos los Días de Mora</option>
          <option value="Más de 30 días">Más de 30 días</option>
          <option value="Más de 60 días">Más de 60 días</option>
          <option value="Crítico (+90 días)">Crítico (+90 días)</option>
        </select>
        <button 
          onClick={handleExportExcel}
          className="flex items-center space-x-2 bg-[#151515] border border-zinc-800 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Excel</span>
        </button>
      </div>

      {/* Tabla Principal */}
      <div className="bg-[#151515] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col flex-grow">
        <div className="overflow-x-auto flex-grow">
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
              {currentClients.length > 0 ? (
                currentClients.map((m) => (
                  <tr key={m.id} className="bg-[#1A1A1A] border-b border-zinc-800/30 hover:bg-white/[0.02] transition-colors last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={m.avatar} alt={m.alumno} className="w-8 h-8 rounded-full object-cover" />
                        <p className="text-sm font-medium text-[#FAFAFA]">{m.alumno}</p>
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
                      <p className={`text-sm font-bold ${m.diasMora > 90 ? 'text-red-500' : 'text-orange-500'}`}>
                        {m.diasMora} <span className="text-zinc-600 font-normal text-[10px] ml-1 uppercase tracking-wider">días</span>
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-bold text-[#FAFAFA]">{formatCurrency(m.montoAdeudado)}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded border text-[9px] font-bold uppercase tracking-wider ${
                        m.alerta === 'NOTIFICADO' ? 'border-[#234A2E] bg-[#1B2A1E]/80 text-[#4ADE80]' :
                        m.alerta === 'PENDIENTE' ? 'border-orange-900/50 bg-orange-900/20 text-orange-400' :
                        'border-red-900/50 bg-red-900/20 text-red-400'
                      }`}>
                        {m.alerta}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-zinc-500 text-sm">
                    No se encontraron clientes morosos con estos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-zinc-800 bg-[#151515] mt-auto">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            MOSTRANDO {startItem}-{endItem} DE {clientesFiltrados.length}
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

      {/* Footer (Acciones Inferiores) */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <button 
          onClick={() => navigate('/admin/finanzas')}
          className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER AL DASHBOARD FINANCIERO</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleExportPDF}
            className="flex items-center space-x-2 bg-[#7B8B9E] hover:bg-slate-400 text-white px-6 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Exportar Listado de Morosos</span>
          </button>
        </div>
      </div>
    </div>
  );
}

