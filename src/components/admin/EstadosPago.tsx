import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banknote, Clock, AlertTriangle, Search, ArrowLeft, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock Data (25 registros)
const mockPagos = [
  // Sede Norte, Octubre
  { id: 1, fecha: '24 Oct 2023', socio: 'Martín Rodríguez', dni: '34.555.880', sede: 'Sede Norte', concepto: 'Cuota Mensual', monto: 25000, estado: 'Recibido', periodo: 'Octubre 2023', avatar: 'MR' },
  { id: 2, fecha: '20 Oct 2023', socio: 'Ana Paz', dni: '40.111.222', sede: 'Sede Norte', concepto: 'Pase Libre', monto: 35000, estado: 'Recibido', periodo: 'Octubre 2023', avatar: 'AP' },
  { id: 3, fecha: '25 Oct 2023', socio: 'Carlos Rey', dni: '35.444.555', sede: 'Sede Norte', concepto: 'Cross Training', monto: 28000, estado: 'Pendiente', periodo: 'Octubre 2023', avatar: 'CR' },
  // Sede Norte, Noviembre
  { id: 4, fecha: '05 Nov 2023', socio: 'Lucía Fernández', dni: '38.452.910', sede: 'Sede Norte', concepto: 'Musculación', monto: 14200, estado: 'Deuda', periodo: 'Noviembre 2023', avatar: 'LF' },
  { id: 5, fecha: '10 Nov 2023', socio: 'Juan Pérez', dni: '31.144.255', sede: 'Sede Norte', concepto: 'Inscripción Inicial', monto: 15000, estado: 'Recibido', periodo: 'Noviembre 2023', avatar: 'JP' },
  { id: 6, fecha: '12 Nov 2023', socio: 'María López', dni: '42.333.444', sede: 'Sede Norte', concepto: 'Pase Libre', monto: 35000, estado: 'Pendiente', periodo: 'Noviembre 2023', avatar: 'ML' },

  // Sede Centro, Octubre
  { id: 7, fecha: '23 Oct 2023', socio: 'Laura Gómez', dni: '41.214.557', sede: 'Sede Centro', concepto: 'Pase Libre Anual', monto: 180000, estado: 'Recibido', periodo: 'Octubre 2023', avatar: 'LG' },
  { id: 8, fecha: '10 Oct 2023', socio: 'Valeria Fernández', dni: '38.111.222', sede: 'Sede Centro', concepto: 'Clases Personales (x10)', monto: 45000, estado: 'Deuda', periodo: 'Octubre 2023', avatar: 'VF' },
  { id: 9, fecha: '15 Oct 2023', socio: 'Santiago Ruiz', dni: '36.555.666', sede: 'Sede Centro', concepto: 'Musculación', monto: 20000, estado: 'Recibido', periodo: 'Octubre 2023', avatar: 'SR' },
  { id: 10, fecha: '28 Oct 2023', socio: 'Elena Gil', dni: '39.777.888', sede: 'Sede Centro', concepto: 'Cross Training', monto: 30000, estado: 'Pendiente', periodo: 'Octubre 2023', avatar: 'EG' },
  // Sede Centro, Noviembre
  { id: 11, fecha: '02 Nov 2023', socio: 'Marcos Rossi', dni: '41.201.033', sede: 'Sede Centro', concepto: 'Cross Training', monto: 8500, estado: 'Deuda', periodo: 'Noviembre 2023', avatar: 'MR' },
  { id: 12, fecha: '08 Nov 2023', socio: 'Sofía Méndez', dni: '35.981.222', sede: 'Sede Centro', concepto: 'Pase Libre', monto: 22400, estado: 'Recibido', periodo: 'Noviembre 2023', avatar: 'SM' },
  { id: 13, fecha: '18 Nov 2023', socio: 'Mateo Gómez', dni: '40.112.553', sede: 'Sede Centro', concepto: 'Musculación', monto: 12400, estado: 'Pendiente', periodo: 'Noviembre 2023', avatar: 'MG' },
  { id: 14, fecha: '20 Nov 2023', socio: 'Valentina Ortiz', dni: '39.882.112', sede: 'Sede Centro', concepto: 'Yoga & Balance', monto: 9800, estado: 'Recibido', periodo: 'Noviembre 2023', avatar: 'VO' },

  // Sede Sur, Octubre
  { id: 15, fecha: '25 Oct 2023', socio: 'Carlos Silva', dni: '28.875.143', sede: 'Sede Sur', concepto: 'Cuota Mensual + Locker', monto: 28500, estado: 'Pendiente', periodo: 'Octubre 2023', avatar: 'CS' },
  { id: 16, fecha: '05 Oct 2023', socio: 'Diego Torres', dni: '34.777.555', sede: 'Sede Sur', concepto: 'Musculación', monto: 15000, estado: 'Deuda', periodo: 'Octubre 2023', avatar: 'DT' },
  { id: 17, fecha: '11 Oct 2023', socio: 'Camila Ríos', dni: '39.888.666', sede: 'Sede Sur', concepto: 'Cross Training', monto: 40000, estado: 'Deuda', periodo: 'Octubre 2023', avatar: 'CR' },
  { id: 18, fecha: '22 Oct 2023', socio: 'Andrés Castro', dni: '40.999.777', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 18000, estado: 'Recibido', periodo: 'Octubre 2023', avatar: 'AC' },
  { id: 19, fecha: '29 Oct 2023', socio: 'Florencia Luna', dni: '38.111.888', sede: 'Sede Sur', concepto: 'Musculación', monto: 18000, estado: 'Recibido', periodo: 'Octubre 2023', avatar: 'FL' },
  // Sede Sur, Noviembre
  { id: 20, fecha: '04 Nov 2023', socio: 'Santiago Vega', dni: '37.222.999', sede: 'Sede Sur', concepto: 'Cross Training', monto: 21000, estado: 'Pendiente', periodo: 'Noviembre 2023', avatar: 'SV' },
  { id: 21, fecha: '09 Nov 2023', socio: 'Martina Paz', dni: '41.333.000', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 35000, estado: 'Recibido', periodo: 'Noviembre 2023', avatar: 'MP' },
  { id: 22, fecha: '15 Nov 2023', socio: 'Tomás Herrero', dni: '36.444.111', sede: 'Sede Sur', concepto: 'Musculación', monto: 28000, estado: 'Deuda', periodo: 'Noviembre 2023', avatar: 'TH' },
  { id: 23, fecha: '19 Nov 2023', socio: 'Paula Blanco', dni: '35.555.222', sede: 'Sede Sur', concepto: 'Cross Training', monto: 45000, estado: 'Recibido', periodo: 'Noviembre 2023', avatar: 'PB' },
  { id: 24, fecha: '24 Nov 2023', socio: 'Nicolás Rojas', dni: '42.666.333', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 12000, estado: 'Pendiente', periodo: 'Noviembre 2023', avatar: 'NR' },
  { id: 25, fecha: '27 Nov 2023', socio: 'Esteban Cruz', dni: '38.888.555', sede: 'Sede Sur', concepto: 'Cross Training', monto: 16000, estado: 'Deuda', periodo: 'Noviembre 2023', avatar: 'EC' }
];

export default function EstadosPago() {
  const navigate = useNavigate();

  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroSede, setFiltroSede] = useState('Todas las Sedes');
  const [filtroPeriodo, setFiltroPeriodo] = useState('Todos los Meses');
  const [filtroEstado, setFiltroEstado] = useState('Todos los Estados');
  const [paginaActual, setPaginaActual] = useState(1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(amount);
  };

  // Filtrado
  const pagosFiltrados = mockPagos.filter(p => {
    const searchMatch = p.socio.toLowerCase().includes(searchTerm.toLowerCase()) || p.dni.includes(searchTerm);
    const sedeMatch = filtroSede === 'Todas las Sedes' || p.sede === filtroSede;
    const periodoMatch = filtroPeriodo === 'Todos los Meses' || p.periodo === filtroPeriodo;
    const estadoMatch = filtroEstado === 'Todos los Estados' || p.estado === filtroEstado;
    return searchMatch && sedeMatch && periodoMatch && estadoMatch;
  });

  // KPIs Dinámicos basados en filtros (o globales si se prefiriese, pero aquí los hacemos reaccionar a filtros)
  const totalRecibido = pagosFiltrados.filter(p => p.estado === 'Recibido').reduce((acc, curr) => acc + curr.monto, 0);
  const totalPendiente = pagosFiltrados.filter(p => p.estado === 'Pendiente').reduce((acc, curr) => acc + curr.monto, 0);
  const totalDeuda = pagosFiltrados.filter(p => p.estado === 'Deuda').reduce((acc, curr) => acc + curr.monto, 0);

  // Paginación
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(pagosFiltrados.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (paginaActual > totalPages) setPaginaActual(1);
  }, [pagosFiltrados.length, paginaActual, totalPages]);

  const currentPagos = pagosFiltrados.slice(
    (paginaActual - 1) * ITEMS_PER_PAGE,
    paginaActual * ITEMS_PER_PAGE
  );

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
        className={`w-7 h-7 flex items-center justify-center rounded text-xs font-bold transition-colors cursor-pointer ${isActive
            ? 'bg-[#7B8B9E] text-white'
            : 'hover:bg-zinc-800 text-zinc-400 font-medium'
          }`}
      >
        {page}
      </button>
    );
  };

  // Exportación PDF con Corte de Control Jerárquico
  const exportarReportePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Título Centrado
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("SquatGym - Informe de Cobranzas", pageWidth / 2, 22, { align: 'center' });

    let startY = 35;
    let grandTotal = 0;

    // 1. Agrupamiento Jerárquico (Sede -> Periodo)
    type Pago = typeof mockPagos[0];
    const agrupado: Record<string, Record<string, Pago[]>> = {};

    pagosFiltrados.forEach(p => {
      if (!agrupado[p.sede]) {
        agrupado[p.sede] = {};
      }
      if (!agrupado[p.sede][p.periodo]) {
        agrupado[p.sede][p.periodo] = [];
      }
      agrupado[p.sede][p.periodo].push(p);
    });

    // 2. Iteración y Renderizado
    Object.entries(agrupado).sort((a, b) => a[0].localeCompare(b[0])).forEach(([sede, periodos], index) => {
      // Si no es la primera sede, dar un margen superior
      if (index > 0) startY += 10;

      if (startY > 250) {
        doc.addPage();
        startY = 20;
      }

      let totalSede = 0;

      // Título H1: Sede
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`Sede: ${sede}`, 14, startY);
      startY += 8;

      Object.entries(periodos).sort((a, b) => a[0].localeCompare(b[0])).forEach(([periodo, pagosPeriodo]) => {
        if (startY > 260) {
          doc.addPage();
          startY = 20;
        }

        // Título H2: Período (Sangría a x=20, letra más chica)
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        doc.setFont("helvetica", "normal");
        doc.text(`Período: ${periodo}`, 20, startY);
        startY += 6;

        const subtotalPeriodo = pagosPeriodo.reduce((sum, p) => sum + p.monto, 0);
        totalSede += subtotalPeriodo;
        grandTotal += subtotalPeriodo;

        const tableColumn = ['Fecha', 'Socio', 'DNI', 'Concepto', 'Estado', 'Monto'];
        const tableRows = pagosPeriodo.map(p => [
          p.fecha,
          p.socio,
          p.dni,
          p.concepto,
          p.estado,
          formatCurrency(p.monto)
        ]);

        autoTable(doc, {
          startY: startY,
          margin: { left: 20 }, // Alinear tabla con el período
          head: [tableColumn],
          body: tableRows,
          theme: 'grid',
          headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
          styles: { fontSize: 9, cellPadding: 3 },
          columnStyles: { 5: { halign: 'right' } }
        });

        startY = (doc as any).lastAutoTable.finalY + 6;

        if (startY > 275) {
          doc.addPage();
          startY = 20;
        }

        // Subtotal del Período
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(`Total ${periodo} - ${sede}: ${formatCurrency(subtotalPeriodo)}`, 20, startY);
        startY += 10; // Espacio extra para el siguiente periodo
      });

      // Total de la Sede
      if (startY > 270) {
        doc.addPage();
        startY = 20;
      }
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFillColor(245, 245, 245);
      doc.rect(14, startY - 5, 180, 8, 'F');
      doc.text(`Total Sede ${sede}: ${formatCurrency(totalSede)}`, 16, startY);
      startY += 12;
    });

    // Total General
    if (grandTotal > 0) {
      if (startY > 260) {
        doc.addPage();
        startY = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFillColor(230, 230, 230);
      doc.rect(14, startY - 6, 180, 10, 'F');
      doc.text(`TOTAL GENERAL RECAUDADO: ${formatCurrency(grandTotal)}`, 16, startY + 1);
    } else {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("No hay registros para los filtros seleccionados.", 14, startY);
    }

    doc.save("Reporte_Pagos_SquatGym.pdf");
  };

  const startItem = pagosFiltrados.length === 0 ? 0 : (paginaActual - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(paginaActual * ITEMS_PER_PAGE, pagosFiltrados.length);

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col h-full min-h-[calc(100vh-100px)]">
      {/* Encabezado */}
      <div>
        <h1 className="text-[3rem] font-black text-[#FAFAFA] tracking-tighter mb-6 uppercase leading-none">
          ESTADOS DE PAGO
        </h1>
      </div>

      {/* Tarjetas KPI Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#151515] p-6 rounded-2xl border-b-2 border-emerald-500 relative transition-all">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">TOTAL RECIBIDO</p>
            <Banknote className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-3xl font-normal text-[#FAFAFA]">{formatCurrency(totalRecibido)}</p>
          </div>
          <p className="text-sm text-zinc-400">Según filtros aplicados</p>
        </div>

        <div className="bg-[#151515] p-6 rounded-2xl border-b-2 border-yellow-500 relative transition-all">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">TOTAL PENDIENTE</p>
            <Clock className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-3xl font-normal text-[#FAFAFA]">{formatCurrency(totalPendiente)}</p>
          </div>
          <p className="text-sm text-zinc-400">Según filtros aplicados</p>
        </div>

        <div className="bg-[#151515] p-6 rounded-2xl border-b-2 border-red-500 relative transition-all">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">TOTAL EN DEUDA</p>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-3xl font-normal text-[#FAFAFA]">{formatCurrency(totalDeuda)}</p>
          </div>
          <p className="text-sm text-zinc-400">Según filtros aplicados</p>
        </div>
      </div>

      {/* Barra de Herramientas (Filtros) */}
      <div className="flex flex-col md:flex-row items-center gap-4 py-2">
        <div className="flex-grow relative w-full md:w-auto">
          <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por Nombre o DNI..."
            className="w-full bg-[#151515] border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-[#FAFAFA] placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        <select
          value={filtroSede}
          onChange={(e) => setFiltroSede(e.target.value)}
          className="bg-[#151515] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-[#FAFAFA] focus:outline-none focus:border-zinc-600 appearance-none pr-10 min-w-[160px] cursor-pointer transition-colors"
        >
          <option value="Todas las Sedes">Todas las Sedes</option>
          <option value="Sede Norte">Sede Norte</option>
          <option value="Sede Centro">Sede Centro</option>
          <option value="Sede Sur">Sede Sur</option>
        </select>
        <select
          value={filtroPeriodo}
          onChange={(e) => setFiltroPeriodo(e.target.value)}
          className="bg-[#151515] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-[#FAFAFA] focus:outline-none focus:border-zinc-600 appearance-none pr-10 min-w-[140px] cursor-pointer transition-colors"
        >
          <option value="Todos los Meses">Todos los Meses</option>
          <option value="Octubre 2023">Octubre 2023</option>
          <option value="Noviembre 2023">Noviembre 2023</option>
        </select>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="bg-[#151515] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-[#FAFAFA] focus:outline-none focus:border-zinc-600 appearance-none pr-10 min-w-[160px] cursor-pointer transition-colors"
        >
          <option value="Todos los Estados">Todos los Estados</option>
          <option value="Recibido">Recibido</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Deuda">Deuda</option>
        </select>
      </div>

      {/* Tabla Principal */}
      <div className="bg-[#151515] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col flex-grow">
        <div className="overflow-x-auto flex-grow">
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
              {currentPagos.length > 0 ? (
                currentPagos.map((p) => (
                  <tr key={p.id} className="bg-[#1A1A1A] border-b border-zinc-800/30 hover:bg-white/[0.02] transition-colors last:border-0">
                    <td className="px-6 py-4">
                      <p className={`text-sm font-medium ${p.estado === 'Deuda' ? 'text-red-500' : 'text-[#FAFAFA]'}`}>
                        {p.fecha}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-[#FAFAFA]">
                          {p.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#FAFAFA]">{p.socio}</p>
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
                      <p className="text-sm font-bold text-[#FAFAFA]">{formatCurrency(p.monto)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase
                        ${p.estado === 'Recibido' ? 'bg-[#1B2A1E]/80 text-[#4ADE80] border border-[#234A2E]' :
                          p.estado === 'Pendiente' ? 'bg-[#3A2D12]/80 text-[#FBBF24] border border-[#52401A]' :
                            'bg-[#3A1818]/80 text-[#F87171] border border-[#5A2525]'}`}
                      >
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-zinc-500 text-sm">
                    No se encontraron pagos con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-zinc-800 bg-[#151515] mt-auto">
          <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Mostrando {startItem} a {endItem} de {pagosFiltrados.length} registros</p>
          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              <button
                onClick={handlePrevPage}
                disabled={paginaActual === 1}
                className="px-3 py-1.5 rounded text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => renderPageButton(page))}

              <button
                onClick={handleNextPage}
                disabled={paginaActual === totalPages}
                className="px-3 py-1.5 rounded text-xs border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
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

        <button
          onClick={exportarReportePDF}
          className="flex items-center space-x-2 bg-[#7B8B9E] hover:bg-slate-400 text-white px-6 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Reporte</span>
        </button>
      </div>
    </div>
  );
}

