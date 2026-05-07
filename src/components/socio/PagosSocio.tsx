import { Calendar, SlidersHorizontal, Download, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PagosSocio() {
  const navigate = useNavigate();

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
                ESTADO DE<br/>CUENTA
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
              <span>PAGAR<br/>AHORA</span>
            </button>
          </div>
        </div>

        {/* Tarjeta Derecha (Última Actividad) */}
        <div className="bg-[#151515] p-8 md:p-10 rounded-3xl border border-zinc-800/50 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">ÚLTIMA ACTIVIDAD</h3>
            <h2 className="text-2xl md:text-[1.7rem] font-normal text-white leading-tight uppercase tracking-wide">
              MEMBRESÍA BLACK<br/>PRO ACTIVA
            </h2>
          </div>
          
          <div className="mt-12">
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-[#7B8B9E] rounded-full w-[75%]"></div>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              FALTAN 8 DÍAS PARA EL PRÓXIMO CICLO
            </p>
          </div>
        </div>
      </div>

      {/* 2. Sección Historial de Transacciones */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-[11px] font-bold text-white uppercase tracking-[0.3em]">HISTORIAL DE TRANSACCIONES</h2>
          <button className="flex items-center space-x-2 px-6 py-2.5 bg-[#151515] border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold tracking-widest uppercase">
            <SlidersHorizontal className="w-4 h-4" />
            <span>FILTRAR</span>
          </button>
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
                          <button className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
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
