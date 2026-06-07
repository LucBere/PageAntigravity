import { useState, useEffect, useRef } from 'react';
import { Banknote, Clock, AlertTriangle, Search, Download, MapPin, CircleDot, Calendar, X, ChevronDown } from 'lucide-react';
import FilterSelect from '../common/FilterSelect';
import Badge from '../common/Badge';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock Data (25 registros) — fuente única, también usada por el dashboard Caja/Pagos
export const mockPagos = [
  // Sede Norte, Abril 2026
  { id: 1, fecha: '24 Abr 2026', socio: 'Martín Rodríguez', dni: '34.555.880', sede: 'Sede Norte', concepto: 'Cuota Mensual', monto: 25000, estado: 'Recibido', periodo: 'Abril 2026', avatar: 'MR' },
  { id: 2, fecha: '20 Abr 2026', socio: 'Ana Paz', dni: '40.111.222', sede: 'Sede Norte', concepto: 'Pase Libre', monto: 35000, estado: 'Recibido', periodo: 'Abril 2026', avatar: 'AP' },
  { id: 3, fecha: '25 Abr 2026', socio: 'Carlos Rey', dni: '35.444.555', sede: 'Sede Norte', concepto: 'Cross Training', monto: 28000, estado: 'Pendiente', periodo: 'Abril 2026', avatar: 'CR' },
  // Sede Norte, Mayo 2026
  { id: 4, fecha: '05 May 2026', socio: 'Lucía Fernández', dni: '38.452.910', sede: 'Sede Norte', concepto: 'Musculación', monto: 14200, estado: 'Deuda', periodo: 'Mayo 2026', avatar: 'LF' },
  { id: 5, fecha: '10 May 2026', socio: 'Juan Pérez', dni: '31.144.255', sede: 'Sede Norte', concepto: 'Inscripción Inicial', monto: 15000, estado: 'Recibido', periodo: 'Mayo 2026', avatar: 'JP' },
  { id: 6, fecha: '12 May 2026', socio: 'María López', dni: '42.333.444', sede: 'Sede Norte', concepto: 'Pase Libre', monto: 35000, estado: 'Pendiente', periodo: 'Mayo 2026', avatar: 'ML' },

  // Sede Centro, Abril 2026
  { id: 7, fecha: '23 Abr 2026', socio: 'Laura Gómez', dni: '41.214.557', sede: 'Sede Centro', concepto: 'Pase Libre Anual', monto: 180000, estado: 'Recibido', periodo: 'Abril 2026', avatar: 'LG' },
  { id: 8, fecha: '10 Abr 2026', socio: 'Valeria Fernández', dni: '38.111.222', sede: 'Sede Centro', concepto: 'Clases Personales (x10)', monto: 45000, estado: 'Deuda', periodo: 'Abril 2026', avatar: 'VF' },
  { id: 9, fecha: '15 Abr 2026', socio: 'Santiago Ruiz', dni: '36.555.666', sede: 'Sede Centro', concepto: 'Musculación', monto: 20000, estado: 'Recibido', periodo: 'Abril 2026', avatar: 'SR' },
  { id: 10, fecha: '28 Abr 2026', socio: 'Elena Gil', dni: '39.777.888', sede: 'Sede Centro', concepto: 'Cross Training', monto: 30000, estado: 'Pendiente', periodo: 'Abril 2026', avatar: 'EG' },
  // Sede Centro, Mayo 2026
  { id: 11, fecha: '02 May 2026', socio: 'Marcos Rossi', dni: '41.201.033', sede: 'Sede Centro', concepto: 'Cross Training', monto: 8500, estado: 'Deuda', periodo: 'Mayo 2026', avatar: 'MR' },
  { id: 12, fecha: '08 May 2026', socio: 'Sofía Méndez', dni: '35.981.222', sede: 'Sede Centro', concepto: 'Pase Libre', monto: 22400, estado: 'Recibido', periodo: 'Mayo 2026', avatar: 'SM' },
  { id: 13, fecha: '18 May 2026', socio: 'Mateo Gómez', dni: '40.112.553', sede: 'Sede Centro', concepto: 'Musculación', monto: 12400, estado: 'Pendiente', periodo: 'Mayo 2026', avatar: 'MG' },
  { id: 14, fecha: '20 May 2026', socio: 'Valentina Ortiz', dni: '39.882.112', sede: 'Sede Centro', concepto: 'Yoga & Balance', monto: 9800, estado: 'Recibido', periodo: 'Mayo 2026', avatar: 'VO' },

  // Sede Sur, Octubre 2025
  { id: 15, fecha: '25 Oct 2025', socio: 'Carlos Silva', dni: '28.875.143', sede: 'Sede Sur', concepto: 'Cuota Mensual + Locker', monto: 28500, estado: 'Pendiente', periodo: 'Octubre 2025', avatar: 'CS' },
  { id: 16, fecha: '05 Oct 2025', socio: 'Diego Torres', dni: '34.777.555', sede: 'Sede Sur', concepto: 'Musculación', monto: 15000, estado: 'Deuda', periodo: 'Octubre 2025', avatar: 'DT' },
  { id: 17, fecha: '11 Oct 2025', socio: 'Camila Ríos', dni: '39.888.666', sede: 'Sede Sur', concepto: 'Cross Training', monto: 40000, estado: 'Deuda', periodo: 'Octubre 2025', avatar: 'CR' },
  { id: 18, fecha: '22 Oct 2025', socio: 'Andrés Castro', dni: '40.999.777', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 18000, estado: 'Recibido', periodo: 'Octubre 2025', avatar: 'AC' },
  { id: 19, fecha: '29 Oct 2025', socio: 'Florencia Luna', dni: '38.111.888', sede: 'Sede Sur', concepto: 'Musculación', monto: 18000, estado: 'Recibido', periodo: 'Octubre 2025', avatar: 'FL' },
  // Sede Sur, Noviembre 2025
  { id: 20, fecha: '04 Nov 2025', socio: 'Santiago Vega', dni: '37.222.999', sede: 'Sede Sur', concepto: 'Cross Training', monto: 21000, estado: 'Pendiente', periodo: 'Noviembre 2025', avatar: 'SV' },
  { id: 21, fecha: '09 Nov 2025', socio: 'Martina Paz', dni: '41.333.000', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 35000, estado: 'Recibido', periodo: 'Noviembre 2025', avatar: 'MP' },
  { id: 22, fecha: '15 Nov 2025', socio: 'Tomás Herrero', dni: '36.444.111', sede: 'Sede Sur', concepto: 'Musculación', monto: 28000, estado: 'Deuda', periodo: 'Noviembre 2025', avatar: 'TH' },
  { id: 23, fecha: '19 Nov 2025', socio: 'Paula Blanco', dni: '35.555.222', sede: 'Sede Sur', concepto: 'Cross Training', monto: 45000, estado: 'Recibido', periodo: 'Noviembre 2025', avatar: 'PB' },
  { id: 24, fecha: '24 Nov 2025', socio: 'Nicolás Rojas', dni: '42.666.333', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 12000, estado: 'Pendiente', periodo: 'Noviembre 2025', avatar: 'NR' },
  { id: 25, fecha: '27 Nov 2025', socio: 'Esteban Cruz', dni: '38.888.555', sede: 'Sede Sur', concepto: 'Cross Training', monto: 16000, estado: 'Deuda', periodo: 'Noviembre 2025', avatar: 'EC' },

  // --- Relleno: todos los meses de 2026 ---
  // Enero 2026
  { id: 26, fecha: '08 Ene 2026', socio: 'Martín Rodríguez', dni: '34.555.880', sede: 'Sede Norte', concepto: 'Cuota Mensual', monto: 25000, estado: 'Recibido', periodo: 'Enero 2026', avatar: 'MR' },
  { id: 27, fecha: '15 Ene 2026', socio: 'Ana Paz', dni: '40.111.222', sede: 'Sede Centro', concepto: 'Pase Libre', monto: 35000, estado: 'Pendiente', periodo: 'Enero 2026', avatar: 'AP' },
  { id: 28, fecha: '22 Ene 2026', socio: 'Carlos Rey', dni: '35.444.555', sede: 'Sede Sur', concepto: 'Cross Training', monto: 28000, estado: 'Deuda', periodo: 'Enero 2026', avatar: 'CR' },
  // Febrero 2026
  { id: 29, fecha: '05 Feb 2026', socio: 'Lucía Fernández', dni: '38.452.910', sede: 'Sede Norte', concepto: 'Musculación', monto: 18000, estado: 'Recibido', periodo: 'Febrero 2026', avatar: 'LF' },
  { id: 30, fecha: '12 Feb 2026', socio: 'Juan Pérez', dni: '31.144.255', sede: 'Sede Centro', concepto: 'Inscripción Inicial', monto: 15000, estado: 'Recibido', periodo: 'Febrero 2026', avatar: 'JP' },
  { id: 31, fecha: '20 Feb 2026', socio: 'María López', dni: '42.333.444', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 35000, estado: 'Pendiente', periodo: 'Febrero 2026', avatar: 'ML' },
  // Marzo 2026
  { id: 32, fecha: '03 Mar 2026', socio: 'Laura Gómez', dni: '41.214.557', sede: 'Sede Centro', concepto: 'Pase Libre Anual', monto: 180000, estado: 'Recibido', periodo: 'Marzo 2026', avatar: 'LG' },
  { id: 33, fecha: '14 Mar 2026', socio: 'Santiago Ruiz', dni: '36.555.666', sede: 'Sede Norte', concepto: 'Musculación', monto: 20000, estado: 'Deuda', periodo: 'Marzo 2026', avatar: 'SR' },
  { id: 34, fecha: '25 Mar 2026', socio: 'Elena Gil', dni: '39.777.888', sede: 'Sede Sur', concepto: 'Cross Training', monto: 30000, estado: 'Pendiente', periodo: 'Marzo 2026', avatar: 'EG' },
  // Junio 2026
  { id: 35, fecha: '04 Jun 2026', socio: 'Marcos Rossi', dni: '41.201.033', sede: 'Sede Centro', concepto: 'Cross Training', monto: 28500, estado: 'Recibido', periodo: 'Junio 2026', avatar: 'MR' },
  { id: 36, fecha: '13 Jun 2026', socio: 'Sofía Méndez', dni: '35.981.222', sede: 'Sede Norte', concepto: 'Pase Libre', monto: 22400, estado: 'Recibido', periodo: 'Junio 2026', avatar: 'SM' },
  { id: 37, fecha: '21 Jun 2026', socio: 'Mateo Gómez', dni: '40.112.553', sede: 'Sede Sur', concepto: 'Musculación', monto: 12400, estado: 'Pendiente', periodo: 'Junio 2026', avatar: 'MG' },
  // Julio 2026
  { id: 38, fecha: '06 Jul 2026', socio: 'Valentina Ortiz', dni: '39.882.112', sede: 'Sede Centro', concepto: 'Yoga & Balance', monto: 9800, estado: 'Recibido', periodo: 'Julio 2026', avatar: 'VO' },
  { id: 39, fecha: '17 Jul 2026', socio: 'Diego Torres', dni: '34.777.555', sede: 'Sede Sur', concepto: 'Musculación', monto: 15000, estado: 'Deuda', periodo: 'Julio 2026', avatar: 'DT' },
  { id: 40, fecha: '28 Jul 2026', socio: 'Camila Ríos', dni: '39.888.666', sede: 'Sede Norte', concepto: 'Cross Training', monto: 40000, estado: 'Pendiente', periodo: 'Julio 2026', avatar: 'CR' },
  // Agosto 2026
  { id: 41, fecha: '05 Ago 2026', socio: 'Andrés Castro', dni: '40.999.777', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 18000, estado: 'Recibido', periodo: 'Agosto 2026', avatar: 'AC' },
  { id: 42, fecha: '16 Ago 2026', socio: 'Florencia Luna', dni: '38.111.888', sede: 'Sede Centro', concepto: 'Musculación', monto: 18000, estado: 'Recibido', periodo: 'Agosto 2026', avatar: 'FL' },
  { id: 43, fecha: '27 Ago 2026', socio: 'Santiago Vega', dni: '37.222.999', sede: 'Sede Norte', concepto: 'Cross Training', monto: 21000, estado: 'Pendiente', periodo: 'Agosto 2026', avatar: 'SV' },
  // Septiembre 2026
  { id: 44, fecha: '07 Sep 2026', socio: 'Martina Paz', dni: '41.333.000', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 35000, estado: 'Recibido', periodo: 'Septiembre 2026', avatar: 'MP' },
  { id: 45, fecha: '18 Sep 2026', socio: 'Tomás Herrero', dni: '36.444.111', sede: 'Sede Centro', concepto: 'Musculación', monto: 28000, estado: 'Deuda', periodo: 'Septiembre 2026', avatar: 'TH' },
  { id: 46, fecha: '29 Sep 2026', socio: 'Paula Blanco', dni: '35.555.222', sede: 'Sede Norte', concepto: 'Cross Training', monto: 45000, estado: 'Recibido', periodo: 'Septiembre 2026', avatar: 'PB' },
  // Octubre 2026
  { id: 47, fecha: '09 Oct 2026', socio: 'Nicolás Rojas', dni: '42.666.333', sede: 'Sede Sur', concepto: 'Pase Libre', monto: 12000, estado: 'Pendiente', periodo: 'Octubre 2026', avatar: 'NR' },
  { id: 48, fecha: '20 Oct 2026', socio: 'Esteban Cruz', dni: '38.888.555', sede: 'Sede Centro', concepto: 'Cross Training', monto: 16000, estado: 'Recibido', periodo: 'Octubre 2026', avatar: 'EC' },
  { id: 49, fecha: '30 Oct 2026', socio: 'Martín Rodríguez', dni: '34.555.880', sede: 'Sede Norte', concepto: 'Cuota Mensual', monto: 25000, estado: 'Recibido', periodo: 'Octubre 2026', avatar: 'MR' },
  // Noviembre 2026
  { id: 50, fecha: '08 Nov 2026', socio: 'Ana Paz', dni: '40.111.222', sede: 'Sede Centro', concepto: 'Pase Libre', monto: 35000, estado: 'Recibido', periodo: 'Noviembre 2026', avatar: 'AP' },
  { id: 51, fecha: '19 Nov 2026', socio: 'Carlos Rey', dni: '35.444.555', sede: 'Sede Sur', concepto: 'Cross Training', monto: 28000, estado: 'Pendiente', periodo: 'Noviembre 2026', avatar: 'CR' },
  { id: 52, fecha: '28 Nov 2026', socio: 'Lucía Fernández', dni: '38.452.910', sede: 'Sede Norte', concepto: 'Musculación', monto: 14200, estado: 'Deuda', periodo: 'Noviembre 2026', avatar: 'LF' },
  // Diciembre 2026
  { id: 53, fecha: '05 Dic 2026', socio: 'Juan Pérez', dni: '31.144.255', sede: 'Sede Centro', concepto: 'Inscripción Inicial', monto: 15000, estado: 'Recibido', periodo: 'Diciembre 2026', avatar: 'JP' },
  { id: 54, fecha: '16 Dic 2026', socio: 'María López', dni: '42.333.444', sede: 'Sede Norte', concepto: 'Pase Libre', monto: 35000, estado: 'Recibido', periodo: 'Diciembre 2026', avatar: 'ML' },
  { id: 55, fecha: '27 Dic 2026', socio: 'Laura Gómez', dni: '41.214.557', sede: 'Sede Sur', concepto: 'Cross Training', monto: 30000, estado: 'Pendiente', periodo: 'Diciembre 2026', avatar: 'LG' }
];

// Convierte "Mayo 2026" -> "2026-05" para usar con el selector de mes (input type="month")
const MESES_NUM: Record<string, string> = {
  Enero: '01', Febrero: '02', Marzo: '03', Abril: '04', Mayo: '05', Junio: '06',
  Julio: '07', Agosto: '08', Septiembre: '09', Octubre: '10', Noviembre: '11', Diciembre: '12',
};
const periodoToISO = (periodo: string): string => {
  const [mes, anio] = periodo.split(' ');
  return `${anio}-${MESES_NUM[mes] ?? '01'}`;
};

// "2026-08" -> "Agosto 2026" para mostrar el mes elegido
const NOMBRE_MES: Record<string, string> = {
  '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril', '05': 'Mayo', '06': 'Junio',
  '07': 'Julio', '08': 'Agosto', '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre',
};
const formatMesISO = (iso: string): string => {
  const [anio, mes] = iso.split('-');
  return `${NOMBRE_MES[mes] ?? mes} ${anio}`;
};

export default function EstadosPago() {
  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroSede, setFiltroSede] = useState('Todas las Sedes');
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos los Estados');
  const [paginaActual, setPaginaActual] = useState(1);
  const mesPickerRef = useRef<HTMLInputElement>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(amount);
  };

  // Filtrado
  const pagosFiltrados = mockPagos.filter(p => {
    const searchMatch = p.socio.toLowerCase().includes(searchTerm.toLowerCase()) || p.dni.includes(searchTerm);
    const sedeMatch = filtroSede === 'Todas las Sedes' || p.sede === filtroSede;
    const periodoMatch = !filtroMes || periodoToISO(p.periodo) === filtroMes;
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
            ? 'bg-slate-800 dark:bg-[#6366F1] text-white'
            : 'hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 font-medium'
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
    const pageHeight = doc.internal.pageSize.getHeight();

    // Fecha del Informe (Calculando ancho manualmente para evitar problemas de alineación)
    const fechaActual = new Date().toLocaleDateString('es-AR');
    const textFecha = `Fecha del Informe: ${fechaActual}`;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const textFechaWidth = doc.getTextWidth(textFecha);
    doc.text(textFecha, pageWidth - 14 - textFechaWidth, 15);

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

    // --- INYECCIÓN GLOBAL DE PAGINACIÓN ---
    // Casteamos a 'any' para evitar el falso positivo de TypeScript en Vercel
    const totalPages = (doc as any).internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);

      // Formato exacto: "Pag: X / Y"
      const textPag = `Pag: ${i} / ${totalPages}`;
      const textPagWidth = doc.getTextWidth(textPag);
      
      // Alineación perfecta a la derecha restando el ancho del texto
      doc.text(textPag, pageWidth - 14 - textPagWidth, pageHeight - 10);
    }

    doc.save("Reporte_Pagos_SquatGym.pdf");
  };

  const startItem = pagosFiltrados.length === 0 ? 0 : (paginaActual - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(paginaActual * ITEMS_PER_PAGE, pagosFiltrados.length);

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col h-full min-h-[calc(100vh-100px)]">
      {/* Encabezado */}
      <div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-[#FAFAFA] tracking-tighter mb-6 uppercase leading-none transition-colors">
          ESTADOS DE PAGO
        </h1>
      </div>

      {/* Tarjetas KPI Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border-b-2 border-emerald-500 relative transition-all transition-colors shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold">TOTAL RECIBIDO</p>
            <Banknote className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-3xl font-normal text-slate-900 dark:text-[#FAFAFA] transition-colors">{formatCurrency(totalRecibido)}</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Según filtros aplicados</p>
        </div>

        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border-b-2 border-yellow-500 relative transition-all transition-colors shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold">TOTAL PENDIENTE</p>
            <Clock className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-3xl font-normal text-slate-900 dark:text-[#FAFAFA] transition-colors">{formatCurrency(totalPendiente)}</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Según filtros aplicados</p>
        </div>

        <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border-b-2 border-red-500 relative transition-all transition-colors shadow-sm dark:shadow-none">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold">TOTAL EN DEUDA</p>
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-500" />
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-3xl font-normal text-slate-900 dark:text-[#FAFAFA] transition-colors">{formatCurrency(totalDeuda)}</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Según filtros aplicados</p>
        </div>
      </div>

      {/* Barra de Herramientas (Filtros) */}
      <div className="flex flex-col md:flex-row items-center gap-4 py-2">
        <div className="flex-grow relative w-full md:w-auto">
          <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por Nombre o DNI..."
            className="w-full bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-[#FAFAFA] placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors shadow-sm dark:shadow-none"
          />
        </div>
        <FilterSelect
          value={filtroSede}
          onChange={setFiltroSede}
          ariaLabel="Filtrar por sede"
          active={filtroSede !== 'Todas las Sedes'}
          icon={<MapPin className="w-4 h-4" />}
          className="min-w-[180px]"
          options={[
            { value: 'Todas las Sedes', label: 'Todas las Sedes' },
            { value: 'Sede Norte', label: 'Sede Norte' },
            { value: 'Sede Centro', label: 'Sede Centro' },
            { value: 'Sede Sur', label: 'Sede Sur' },
          ]}
        />
        <div className="relative w-full md:w-auto md:min-w-[200px]">
          {/* Input nativo de mes (oculto, solo para abrir el calendario) */}
          <input
            ref={mesPickerRef}
            type="month"
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            aria-label="Filtrar por mes"
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none [color-scheme:light] dark:[color-scheme:dark]"
          />
          {/* Control visible */}
          <button
            type="button"
            onClick={() => mesPickerRef.current?.showPicker?.()}
            className={`w-full flex items-center rounded-xl py-3 pl-10 pr-9 text-sm border transition-colors shadow-sm dark:shadow-none cursor-pointer ${filtroMes
              ? 'bg-slate-100 dark:bg-zinc-800 border-slate-400 dark:border-zinc-600 text-slate-900 dark:text-white font-semibold'
              : 'bg-white dark:bg-[#151515] border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-[#FAFAFA] hover:border-slate-300 dark:hover:border-zinc-700'}`}
          >
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
            <span className="flex-grow text-left truncate">{filtroMes ? formatMesISO(filtroMes) : 'Todos los meses'}</span>
            {!filtroMes && <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />}
          </button>
          {/* Botón para borrar el mes y volver a "Todos los meses" */}
          {filtroMes && (
            <button
              type="button"
              onClick={() => setFiltroMes('')}
              aria-label="Quitar mes y ver todos"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <FilterSelect
          value={filtroEstado}
          onChange={setFiltroEstado}
          ariaLabel="Filtrar por estado"
          active={filtroEstado !== 'Todos los Estados'}
          icon={<CircleDot className="w-4 h-4" />}
          className="min-w-[180px]"
          options={[
            { value: 'Todos los Estados', label: 'Todos los Estados' },
            { value: 'Recibido', label: 'Recibido' },
            { value: 'Pendiente', label: 'Pendiente' },
            { value: 'Deuda', label: 'Deuda' },
          ]}
        />
      </div>

      {/* Tabla Principal */}
      <div className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col flex-grow transition-colors shadow-sm dark:shadow-none">
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50">FECHA</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50">SOCIO / ALUMNO</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50">SEDE</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50">CONCEPTO</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50">MONTO</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {currentPagos.length > 0 ? (
                currentPagos.map((p) => (
                  <tr key={p.id} className="bg-slate-50 dark:bg-[#1A1A1A] border-b border-slate-100 dark:border-zinc-800/30 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors last:border-0">
                    <td className="px-6 py-4">
                      <p className={`text-sm font-medium ${p.estado === 'Deuda' ? 'text-red-600 dark:text-red-500' : 'text-slate-900 dark:text-[#FAFAFA]'}`}>
                        {p.fecha}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-[#FAFAFA] transition-colors">
                          {p.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-[#FAFAFA] transition-colors">{p.socio}</p>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-500">DNI: {p.dni}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-500 dark:text-zinc-400">{p.sede}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 dark:text-zinc-300">{p.concepto}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900 dark:text-[#FAFAFA] transition-colors">{formatCurrency(p.monto)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={p.estado === 'Recibido' ? 'success' : p.estado === 'Pendiente' ? 'warning' : 'danger'}>
                        {p.estado}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500 dark:text-zinc-500 text-sm">
                    No se encontraron pagos con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151515] mt-auto transition-colors shadow-sm dark:shadow-none">
          <p className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 tracking-widest uppercase">Mostrando {startItem} a {endItem} de {pagosFiltrados.length} registros</p>
          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              <button
                onClick={handlePrevPage}
                disabled={paginaActual === 1}
                className="px-3 py-1.5 rounded text-xs text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => renderPageButton(page))}

              <button
                onClick={handleNextPage}
                disabled={paginaActual === totalPages}
                className="px-3 py-1.5 rounded text-xs border border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer (Acciones Inferiores) */}
      <div className="flex items-center justify-end mt-auto pt-2">
        <button
          onClick={exportarReportePDF}
          className="flex items-center space-x-2 bg-slate-800 dark:bg-[#6366F1] hover:bg-slate-700 dark:hover:bg-[#4F46E5] text-white px-6 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Reporte</span>
        </button>
      </div>
    </div>
  );
}

