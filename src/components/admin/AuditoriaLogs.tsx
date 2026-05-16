import { useState, useMemo, useEffect } from 'react';
import { Search, FileText, Download, AlertTriangle, History, ChevronLeft, ChevronRight } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const allLogs = [
  { id: 1, usuario: 'Admin_Mario', ip: '192.168.1.42', avatar: 'AM', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'ELIMINACIÓN DE USUARIO', actionBg: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:text-red-500 dark:border-red-900/50', modulo: 'Gestión Clientes', fechaHora: '24 Oct, 2023\n14:22:05', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 2, usuario: 'Lucia_Rec', ip: '192.168.1.15', avatar: 'LR', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'CAMBIO DE PASSWORD', actionBg: 'bg-slate-100 text-slate-700 border border-slate-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700', modulo: 'Perfil', fechaHora: '24 Oct, 2023\n13:45:12', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 3, usuario: 'Anónimo', ip: '201.24.11.90', avatar: '?', avatarBg: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-500', accion: 'FALLA DE LOGIN', actionBg: 'bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-950/50 dark:text-orange-500 dark:border-orange-900/50', modulo: 'Auth System', fechaHora: '24 Oct, 2023\n12:10:59', estado: 'BLOQUEADO', statusColor: 'bg-red-500', isAlert: true },
  { id: 4, usuario: 'SuperAdmin', ip: '127.0.0.1', avatar: 'SA', avatarBg: 'bg-yellow-100 text-yellow-700 dark:bg-[#3A2D12] dark:text-[#FBBF24]', accion: 'PAGO REGISTRADO', actionBg: 'bg-green-50 text-green-600 border border-green-200 dark:bg-green-950/30 dark:text-green-500 dark:border-green-900/50', modulo: 'Finanzas', fechaHora: '24 Oct, 2023\n09:30:00', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 5, usuario: 'Admin_Mario', ip: '192.168.1.42', avatar: 'AM', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'NUEVO INGRESO', actionBg: 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-500 dark:border-blue-900/50', modulo: 'Auth System', fechaHora: '23 Oct, 2023\n18:15:22', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 6, usuario: 'Lucia_Rec', ip: '192.168.1.15', avatar: 'LR', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'PAGO REGISTRADO', actionBg: 'bg-green-50 text-green-600 border border-green-200 dark:bg-green-950/30 dark:text-green-500 dark:border-green-900/50', modulo: 'Finanzas', fechaHora: '23 Oct, 2023\n17:40:10', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 7, usuario: 'Anónimo', ip: '10.0.0.5', avatar: '?', avatarBg: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-500', accion: 'FALLA DE LOGIN', actionBg: 'bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-950/50 dark:text-orange-500 dark:border-orange-900/50', modulo: 'Auth System', fechaHora: '23 Oct, 2023\n15:20:00', estado: 'FALLA', statusColor: 'bg-orange-500', isAlert: true },
  { id: 8, usuario: 'SuperAdmin', ip: '127.0.0.1', avatar: 'SA', avatarBg: 'bg-yellow-100 text-yellow-700 dark:bg-[#3A2D12] dark:text-[#FBBF24]', accion: 'ELIMINACIÓN DE USUARIO', actionBg: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:text-red-500 dark:border-red-900/50', modulo: 'Gestión Clientes', fechaHora: '23 Oct, 2023\n11:10:05', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 9, usuario: 'Admin_Mario', ip: '192.168.1.42', avatar: 'AM', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'CAMBIO DE PASSWORD', actionBg: 'bg-slate-100 text-slate-700 border border-slate-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700', modulo: 'Perfil', fechaHora: '22 Oct, 2023\n09:05:11', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 10, usuario: 'Lucia_Rec', ip: '192.168.1.15', avatar: 'LR', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'NUEVO INGRESO', actionBg: 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-500 dark:border-blue-900/50', modulo: 'Auth System', fechaHora: '22 Oct, 2023\n08:30:00', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 11, usuario: 'SuperAdmin', ip: '127.0.0.1', avatar: 'SA', avatarBg: 'bg-yellow-100 text-yellow-700 dark:bg-[#3A2D12] dark:text-[#FBBF24]', accion: 'NUEVO INGRESO', actionBg: 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-500 dark:border-blue-900/50', modulo: 'Auth System', fechaHora: '21 Oct, 2023\n19:45:00', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 12, usuario: 'Anónimo', ip: '172.16.0.10', avatar: '?', avatarBg: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-500', accion: 'FALLA DE LOGIN', actionBg: 'bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-950/50 dark:text-orange-500 dark:border-orange-900/50', modulo: 'Auth System', fechaHora: '21 Oct, 2023\n16:15:33', estado: 'BLOQUEADO', statusColor: 'bg-red-500', isAlert: true },
  { id: 13, usuario: 'Lucia_Rec', ip: '192.168.1.15', avatar: 'LR', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'PAGO REGISTRADO', actionBg: 'bg-green-50 text-green-600 border border-green-200 dark:bg-green-950/30 dark:text-green-500 dark:border-green-900/50', modulo: 'Finanzas', fechaHora: '21 Oct, 2023\n14:20:10', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 14, usuario: 'Admin_Mario', ip: '192.168.1.42', avatar: 'AM', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'ELIMINACIÓN DE USUARIO', actionBg: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:text-red-500 dark:border-red-900/50', modulo: 'Gestión Clientes', fechaHora: '20 Oct, 2023\n10:05:00', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 15, usuario: 'Anónimo', ip: '192.168.1.100', avatar: '?', avatarBg: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-500', accion: 'FALLA DE LOGIN', actionBg: 'bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-950/50 dark:text-orange-500 dark:border-orange-900/50', modulo: 'Auth System', fechaHora: '20 Oct, 2023\n09:12:45', estado: 'FALLA', statusColor: 'bg-orange-500', isAlert: true },
  { id: 16, usuario: 'SuperAdmin', ip: '127.0.0.1', avatar: 'SA', avatarBg: 'bg-yellow-100 text-yellow-700 dark:bg-[#3A2D12] dark:text-[#FBBF24]', accion: 'CAMBIO DE PASSWORD', actionBg: 'bg-slate-100 text-slate-700 border border-slate-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700', modulo: 'Perfil', fechaHora: '19 Oct, 2023\n18:30:20', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 17, usuario: 'Lucia_Rec', ip: '192.168.1.15', avatar: 'LR', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'NUEVO INGRESO', actionBg: 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-500 dark:border-blue-900/50', modulo: 'Auth System', fechaHora: '19 Oct, 2023\n08:00:10', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 18, usuario: 'Admin_Mario', ip: '192.168.1.42', avatar: 'AM', avatarBg: 'bg-green-100 text-green-700 dark:bg-[#1B2A1E] dark:text-[#4ADE80]', accion: 'PAGO REGISTRADO', actionBg: 'bg-green-50 text-green-600 border border-green-200 dark:bg-green-950/30 dark:text-green-500 dark:border-green-900/50', modulo: 'Finanzas', fechaHora: '18 Oct, 2023\n15:45:00', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
  { id: 19, usuario: 'Anónimo', ip: '8.8.8.8', avatar: '?', avatarBg: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-500', accion: 'FALLA DE LOGIN', actionBg: 'bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-950/50 dark:text-orange-500 dark:border-orange-900/50', modulo: 'Auth System', fechaHora: '18 Oct, 2023\n03:22:15', estado: 'BLOQUEADO', statusColor: 'bg-red-500', isAlert: true },
  { id: 20, usuario: 'SuperAdmin', ip: '127.0.0.1', avatar: 'SA', avatarBg: 'bg-yellow-100 text-yellow-700 dark:bg-[#3A2D12] dark:text-[#FBBF24]', accion: 'ELIMINACIÓN DE USUARIO', actionBg: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:text-red-500 dark:border-red-900/50', modulo: 'Gestión Clientes', fechaHora: '17 Oct, 2023\n11:11:11', estado: 'Éxito', statusColor: 'bg-green-500 dark:bg-[#4ADE80]', isAlert: false },
];

export default function AuditoriaLogs() {
  const [busquedaAvanzada, setBusquedaAvanzada] = useState('');
  const [tipoAccion, setTipoAccion] = useState('Todos los eventos');
  const [usuarioResponsable, setUsuarioResponsable] = useState('Cualquier administrador');
  const [rangoFechas, setRangoFechas] = useState('Todas las fechas');

  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPerPage = 5;

  const filteredLogs = useMemo(() => {
    return allLogs.filter(log => {
      const matchBusqueda = log.usuario.toLowerCase().includes(busquedaAvanzada.toLowerCase()) ||
        log.ip.includes(busquedaAvanzada) ||
        log.modulo.toLowerCase().includes(busquedaAvanzada.toLowerCase());

      const matchAccion = tipoAccion === 'Todos los eventos' || log.accion === tipoAccion;
      const matchUsuario = usuarioResponsable === 'Cualquier administrador' || log.usuario === usuarioResponsable;
      const matchFecha = rangoFechas === 'Todas las fechas' || log.fechaHora.includes(rangoFechas);

      return matchBusqueda && matchAccion && matchUsuario && matchFecha;
    });
  }, [busquedaAvanzada, tipoAccion, usuarioResponsable, rangoFechas]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / itemsPerPage));

  useEffect(() => {
    setPaginaActual(1);
  }, [filteredLogs.length]);

  const startIndex = (paginaActual - 1) * itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPaginaActual(page);
    }
  };

  const handleExportExcel = () => {
    const dataToExport = filteredLogs.map(log => ({
      ID: log.id,
      Usuario: log.usuario,
      IP: log.ip,
      Acción: log.accion,
      Módulo: log.modulo,
      'Fecha/Hora': log.fechaHora.replace('\n', ' '),
      Estado: log.estado
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");
    XLSX.writeFile(workbook, "Auditoria_Logs.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("SquatGym - Registro de Auditoría (Logs)", 105, 15, { align: 'center' });

    const tableData = filteredLogs.map(log => [
      log.usuario,
      log.ip,
      log.accion,
      log.modulo,
      log.fechaHora.replace('\n', ' '),
      log.estado
    ]);

    autoTable(doc, {
      head: [['Usuario', 'IP', 'Acción', 'Módulo', 'Fecha/Hora', 'Estado']],
      body: tableData,
      startY: 25,
      theme: 'grid',
    });

    doc.save("Auditoria_Logs.pdf");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[3rem] font-black tracking-tighter mb-1 uppercase leading-none">
            <span className="text-slate-900 dark:text-[#FAFAFA] transition-colors">AUDITORÍA</span> <span className="text-slate-500 transition-colors">(LOGS)</span>
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm transition-colors">
            Supervisión en tiempo real de la actividad administrativa y operacional del sistema.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExportExcel}
            className="flex items-center space-x-2 bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 dark:bg-[#151515] dark:border-zinc-800 dark:hover:bg-zinc-800 dark:text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm dark:shadow-none"
          >
            <FileText className="w-4 h-4" />
            <span>Exportar Excel</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white dark:bg-[#7B8B9E] dark:hover:bg-slate-400 px-5 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm dark:shadow-none"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Reporte PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Panel de Filtros */}
      <div className="bg-white dark:bg-[#151515] rounded-2xl p-6 border border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-bold transition-colors">BÚSQUEDA AVANZADA</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-zinc-500 transition-colors" />
              <input
                type="text"
                placeholder="Ej: ID de Usuario o IP..."
                value={busquedaAvanzada}
                onChange={(e) => setBusquedaAvanzada(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 dark:bg-[#1A1A1A] dark:border-transparent dark:text-white h-10 rounded-lg pl-9 pr-3 text-sm focus:outline-none focus:border-slate-400 dark:focus:ring-1 dark:focus:ring-zinc-700 transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-bold transition-colors">TIPO DE ACCIÓN</label>
            <select
              value={tipoAccion}
              onChange={(e) => setTipoAccion(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 dark:bg-[#1A1A1A] dark:border-transparent dark:text-white h-10 rounded-lg px-3 text-sm focus:outline-none focus:border-slate-400 dark:focus:ring-1 dark:focus:ring-zinc-700 appearance-none cursor-pointer transition-colors"
            >
              <option value="Todos los eventos">Todos los eventos</option>
              <option value="ELIMINACIÓN DE USUARIO">Eliminación de Usuario</option>
              <option value="CAMBIO DE PASSWORD">Cambio de Password</option>
              <option value="FALLA DE LOGIN">Falla de Login</option>
              <option value="NUEVO INGRESO">Nuevo Ingreso</option>
              <option value="PAGO REGISTRADO">Pago Registrado</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-bold transition-colors">USUARIO RESPONSABLE</label>
            <select
              value={usuarioResponsable}
              onChange={(e) => setUsuarioResponsable(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 dark:bg-[#1A1A1A] dark:border-transparent dark:text-white h-10 rounded-lg px-3 text-sm focus:outline-none focus:border-slate-400 dark:focus:ring-1 dark:focus:ring-zinc-700 appearance-none cursor-pointer transition-colors"
            >
              <option value="Cualquier administrador">Cualquier administrador</option>
              <option value="Admin_Mario">Admin_Mario</option>
              <option value="Lucia_Rec">Lucia_Rec</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Anónimo">Anónimo</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-bold transition-colors">RANGO DE FECHAS</label>
            <select
              value={rangoFechas}
              onChange={(e) => setRangoFechas(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 dark:bg-[#1A1A1A] dark:border-transparent dark:text-white h-10 rounded-lg px-3 text-sm focus:outline-none focus:border-slate-400 dark:focus:ring-1 dark:focus:ring-zinc-700 appearance-none cursor-pointer transition-colors"
            >
              <option value="Todas las fechas">Todas las fechas</option>
              <option value="24 Oct, 2023">24 Oct, 2023</option>
              <option value="23 Oct, 2023">23 Oct, 2023</option>
              <option value="22 Oct, 2023">22 Oct, 2023</option>
              <option value="21 Oct, 2023">21 Oct, 2023</option>
              <option value="20 Oct, 2023">20 Oct, 2023</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Tarjetas KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="md:col-span-2 bg-white dark:bg-[#151515] rounded-2xl p-6 border border-slate-200 dark:border-zinc-800/50 relative overflow-hidden flex flex-col justify-between min-h-[140px] transition-colors shadow-sm dark:shadow-none">
          <p className="text-xs text-slate-500 dark:text-zinc-500 font-bold tracking-widest uppercase mb-2 transition-colors">ALERTAS DE SEGURIDAD (24H)</p>
          <div className="flex items-end justify-between relative z-10">
            <div>
              <p className="text-[4rem] font-bold text-slate-900 dark:text-[#FAFAFA] leading-none mb-2 transition-colors">04</p>
              <p className="text-red-600 dark:text-red-500 text-sm font-bold flex items-center transition-colors">
                <AlertTriangle className="w-4 h-4 mr-1.5" />
                Acciones críticas detectadas
              </p>
            </div>
          </div>
          {/* Gráfico Ecualizador simulado fondo */}
          <div className="absolute right-8 bottom-6 flex items-end space-x-1.5 opacity-80">
            <div className="w-2.5 h-6 bg-red-200 dark:bg-red-900/50 rounded-sm transition-colors"></div>
            <div className="w-2.5 h-10 bg-red-500 dark:bg-red-500 rounded-sm transition-colors"></div>
            <div className="w-2.5 h-14 bg-orange-400 dark:bg-orange-500 rounded-sm transition-colors"></div>
            <div className="w-2.5 h-8 bg-red-200 dark:bg-red-900/50 rounded-sm transition-colors"></div>
            <div className="w-2.5 h-4 bg-slate-300 dark:bg-zinc-800 rounded-sm transition-colors"></div>
          </div>
        </div>

        <div className="md:col-span-1 bg-slate-800 dark:bg-[#7B8B9E] rounded-2xl p-6 relative flex flex-col justify-between min-h-[140px] transition-colors shadow-sm dark:shadow-none">
          <History className="w-6 h-6 text-white mb-4" />
          <div>
            <p className="text-[2.5rem] font-normal text-white leading-none mb-1">
              {filteredLogs.length}
            </p>
            <p className="text-[9px] text-white/70 font-bold tracking-widest uppercase">REGISTROS TOTALES (FILTRADOS)</p>
          </div>
        </div>
      </div>

      {/* 4. Tabla Historial de Eventos */}
      <div className="bg-white dark:bg-[#151515] rounded-2xl border border-slate-200 dark:border-zinc-800/50 overflow-hidden transition-colors shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-zinc-800/50 transition-colors">
          <h2 className="text-sm font-bold text-slate-900 dark:text-[#FAFAFA] uppercase tracking-widest transition-colors">HISTORIAL DE EVENTOS</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-[#4ADE80] animate-pulse transition-colors"></div>
            <span className="text-xs text-slate-500 dark:text-zinc-400 transition-colors">Live Feed Activado</span>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50 transition-colors">USUARIO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50 transition-colors">ACCIÓN</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50 transition-colors">MÓDULO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50 transition-colors">FECHA / HORA</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800/50 transition-colors">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.length > 0 ? currentLogs.map((log) => (
                <tr key={log.id} className={`border-b border-slate-200 dark:border-zinc-800/30 last:border-0 transition-colors ${log.isAlert ? 'bg-red-50 dark:bg-red-950/10' : 'bg-white dark:bg-[#1A1A1A] hover:bg-slate-50 dark:hover:bg-white/[0.02]'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-colors ${log.avatarBg}`}>
                        {log.avatar}
                      </div>
                      <div>
                        <p className={`text-sm font-bold transition-colors ${log.isAlert ? 'text-red-600 dark:text-red-500' : 'text-slate-900 dark:text-[#FAFAFA]'}`}>{log.usuario}</p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-500 transition-colors">{log.ip}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider transition-colors ${log.actionBg}`}>
                      {log.accion}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-800 dark:text-[#FAFAFA] font-medium transition-colors">{log.modulo}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] text-slate-600 dark:text-[#FAFAFA] whitespace-pre-line transition-colors">{log.fechaHora}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${log.statusColor}`}></div>
                      <span className={`text-xs font-bold transition-colors ${log.isAlert ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-[#4ADE80]'}`}>{log.estado}</span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-zinc-500 text-sm transition-colors">
                    No se encontraron registros para los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between border-t border-slate-200 dark:border-zinc-800/50 transition-colors">
          <p className="text-xs text-slate-500 dark:text-zinc-500 transition-colors">
            Mostrando {filteredLogs.length === 0 ? 0 : startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredLogs.length)} de {filteredLogs.length} registros
          </p>
          <div className="flex space-x-1">
            <button
              onClick={() => handlePageChange(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:text-white disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold cursor-pointer transition-colors ${paginaActual === page
                    ? 'bg-slate-800 text-white dark:bg-[#7B8B9E] dark:text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(paginaActual + 1)}
              disabled={paginaActual === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:text-white disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
