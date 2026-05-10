import { useState } from 'react';
import { Calendar, SlidersHorizontal, Download, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function PagosSocio() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const [filtroMetodo, setFiltroMetodo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const handleDownloadReceipt = (transaccion: any) => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SQUATGYM", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("CUIT: 30-71234567-8", 105, 28, { align: "center" });
    doc.text("Dirección: Av. Fuerza 123, CABA", 105, 34, { align: "center" });

    // Separador
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    // Datos del Socio
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DATOS DEL SOCIO", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Nombre: Juan Pérez", 20, 58);
    doc.text("DNI: 35.123.456", 20, 64);
    doc.text("Plan: Pase Libre", 20, 70);

    // Detalle de la Transacción
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DETALLE DE LA TRANSACCIÓN", 20, 85);

    autoTable(doc, {
      startY: 92,
      head: [['Concepto', 'Fecha', 'Transacción', 'Método']],
      body: [
        ['Pago de Membresía Mensual', transaccion.fecha, `TXN-${transaccion.id}0${Math.floor(Math.random() * 1000)}`, transaccion.metodo],
      ],
      theme: 'grid',
      headStyles: { fillColor: [14, 14, 14], textColor: 255 },
      styles: { fontSize: 9 },
    });

    // Totales
    const finalY = (doc as any).lastAutoTable.finalY || 120;

    const numericMonto = parseFloat(transaccion.monto.replace('$', '').replace('.', ''));
    const subtotal = (numericMonto / 1.21).toFixed(2);
    const iva = (numericMonto - parseFloat(subtotal)).toFixed(2);

    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal: $${subtotal}`, 140, finalY + 15);
    doc.text(`IVA (21%): $${iva}`, 140, finalY + 22);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: ${transaccion.monto}`, 140, finalY + 32);

    // Pie de página
    doc.setLineWidth(0.5);
    doc.line(20, finalY + 50, 190, finalY + 50);

    doc.setFontSize(14);
    doc.text(`ESTADO: ${transaccion.estado}`, 105, finalY + 62, { align: "center" });

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Comprobante no válido como factura fiscal.", 105, finalY + 70, { align: "center" });

    doc.save(`comprobante-pago-${transaccion.id}.pdf`);
  };

  const transacciones = [
    { id: 1, fecha: '15 OCT, 2023', monto: '$15.000', metodo: 'VISA DEBIT **** 4210', estado: 'PAGADO', rejected: false },
    { id: 2, fecha: '12 SEP, 2023', monto: '$12.500', metodo: 'TRANSFERENCIA BANCARIA', estado: 'PAGADO', rejected: false },
    { id: 3, fecha: '10 AGO, 2023', monto: '$12.500', metodo: 'QR MERCADO PAGO', estado: 'PAGADO', rejected: false },
    { id: 4, fecha: '08 JUL, 2023', monto: '$12.500', metodo: 'VISA DEBIT **** 4210', estado: 'RECHAZADO', rejected: true },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">

      {/* 1. Tarjetas Superiores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Tarjeta Izquierda (Estado de Cuenta) */}
        <div className="lg:col-span-2 bg-[#151515] p-8 md:p-10 rounded-3xl flex flex-col md:flex-row justify-between border border-zinc-800/50">
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                AL DÍA
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 leading-none">
                ESTADO DE<br />CUENTA
              </h2>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-2 mt-4">
                ÚLTIMO PAGO RECIBIDO
              </p>
              <p className="text-5xl md:text-6xl font-normal text-emerald-500 tracking-tight">
                $15.000
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-10">
              <Calendar className="w-4 h-4 text-zinc-500" />
              <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">FECHA: 10 DE NOVIEMBRE, 2023</p>
            </div>
          </div>

          <div className="flex flex-col justify-center mt-8 md:mt-0 md:ml-8 shrink-0">
            <button
              onClick={() => navigate('/socio/checkout')}
              className="px-10 py-10 bg-[#388E3C] hover:bg-emerald-600 text-white text-sm font-bold uppercase tracking-[0.2em] rounded-2xl transition-colors shadow-lg shadow-[#388E3C]/20 text-center leading-relaxed cursor-pointer h-full md:max-h-40 flex items-center justify-center"
            >
              <span>PAGAR<br />AHORA</span>
            </button>
          </div>
        </div>

        {/* Tarjeta Derecha (Última Actividad) */}
        <div className="bg-[#151515] p-8 md:p-10 rounded-3xl border border-zinc-800/50 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">ÚLTIMA ACTIVIDAD</h3>
            <h2 className="text-2xl md:text-[1.7rem] font-normal text-white leading-tight uppercase tracking-wide">
              PASE LIBRE<br />ACTIVO
            </h2>
          </div>

          <div className="mt-12">
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-[#7B8B9E] rounded-full w-[75%]"></div>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              FALTAN 5 DÍAS PARA EL PRÓXIMO CICLO
            </p>
          </div>
        </div>
      </div>

      {/* 2. Sección Historial de Transacciones */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 relative">
          <h2 className="text-[11px] font-bold text-white uppercase tracking-[0.3em]">HISTORIAL DE TRANSACCIONES</h2>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-2.5 bg-[#151515] border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold tracking-widest uppercase"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>FILTRAR</span>
            </button>

            {showFilters && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden text-white">
                <div className="p-4 border-b border-zinc-700/50">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Por Período</h4>
                  <div className="space-y-2">
                    {['Últimos 30 días', 'Últimos 3 meses', 'Año 2023'].map(opt => (
                      <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                        <input type="radio" name="periodo" checked={filtroPeriodo === opt} onChange={() => setFiltroPeriodo(opt)} className="w-3 h-3 accent-[#7B8B9E] bg-zinc-900 border-zinc-700" />
                        <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-b border-zinc-700/50">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Por Método</h4>
                  <div className="space-y-2">
                    {['Tarjeta', 'Transferencia', 'QR'].map(opt => (
                      <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                        <input type="radio" name="metodo" checked={filtroMetodo === opt} onChange={() => setFiltroMetodo(opt)} className="w-3 h-3 accent-[#7B8B9E] bg-zinc-900 border-zinc-700" />
                        <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Por Estado</h4>
                  <div className="space-y-2">
                    {['Pagado', 'Rechazado'].map(opt => (
                      <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                        <input type="radio" name="estado" checked={filtroEstado === opt} onChange={() => setFiltroEstado(opt)} className="w-3 h-3 accent-[#7B8B9E] bg-zinc-900 border-zinc-700" />
                        <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#151515] rounded-3xl border border-zinc-800/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="border-b border-zinc-800/80 text-[10px] text-zinc-500 uppercase tracking-widest">
                  <th className="px-8 py-6 font-bold">FECHA</th>
                  <th className="px-8 py-6 font-bold">MONTO</th>
                  <th className="px-8 py-6 font-bold">MÉTODO</th>
                  <th className="px-8 py-6 font-bold">ESTADO</th>
                  <th className="px-8 py-6 font-bold text-center">RECIBO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {transacciones.map((t) => (
                  <tr key={t.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-8 py-6">
                      <span className={`text-sm font-bold uppercase tracking-wider ${t.rejected ? 'text-zinc-500' : 'text-white'}`}>{t.fecha}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-sm font-bold tracking-wider ${t.rejected ? 'text-zinc-500' : 'text-white'}`}>{t.monto}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] text-zinc-400 font-bold tracking-[0.15em] uppercase">{t.metodo}</span>
                    </td>
                    <td className="px-8 py-6">
                      {t.rejected ? (
                        <span className="inline-flex items-center px-3 py-1 rounded border border-red-900/30 bg-[#1A0A0A] text-red-500/80 text-[9px] font-bold uppercase tracking-[0.2em]">
                          RECHAZADO
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded border border-[#388E3C]/20 bg-[#388E3C]/10 text-[#388E3C] text-[9px] font-bold uppercase tracking-[0.2em]">
                          PAGADO
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex justify-center items-center">
                        {t.rejected ? (
                          <Ban className="w-5 h-5 text-red-900/40" />
                        ) : (
                          <button
                            onClick={() => handleDownloadReceipt(t)}
                            className="text-zinc-400 hover:text-white hover:scale-110 transition-all cursor-pointer"
                            title="Descargar Comprobante"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
