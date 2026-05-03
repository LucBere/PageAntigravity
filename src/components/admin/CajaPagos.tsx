import { useNavigate } from 'react-router-dom';
import { Mail, Send, Bell, AlertTriangle, TrendingUp } from 'lucide-react';

export default function CajaPagos() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#7B8B9E]"></div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">ESTADO DE CUENTA REAL</span>
        </div>
        <h1 className="text-[2.5rem] leading-tight font-bold text-[#FAFAFA] tracking-wide mb-2 uppercase">
          CAJA / PAGOS
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl">
          Gestión de flujo de efectivo, recuperación de cartera y alertas de morosidad automatizadas.
        </p>
      </div>

      {/* Estructura del Layout Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tarjetas KPI */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">RECAUDADO HOY</p>
              <p className="text-4xl font-normal text-[#FAFAFA] mb-2">$4.250,00</p>
              <p className="text-emerald-500 text-xs font-medium flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% vs ayer
              </p>
            </div>
            
            <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">DEUDA PENDIENTE</p>
              <p className="text-4xl font-normal text-[#FAFAFA] mb-2">$1.840,00</p>
              <p className="text-red-500 text-xs font-medium flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                14 Clientes en mora
              </p>
            </div>
          </div>

          {/* Sección Clientes en Mora */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <h2 className="text-sm font-bold text-[#FAFAFA] uppercase tracking-widest">CLIENTES EN MORA</h2>
              <span className="bg-red-500/10 text-red-500 text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-wider border border-red-500/20">
                CRÍTICO
              </span>
            </div>

            {/* Lista */}
            <div className="space-y-3">
              {/* Item 1 */}
              <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between border border-zinc-800/50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-[#FAFAFA] font-bold text-sm">
                    RM
                  </div>
                  <div>
                    <p className="text-[#FAFAFA] text-sm font-bold">Ricardo Mendoza</p>
                    <p className="text-zinc-500 text-xs">Vencido hace 12 días</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-red-500 text-sm font-bold">$120,00</p>
                    <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-wider">PLAN ANUAL</p>
                  </div>
                  <button className="w-10 h-10 rounded-lg border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between border border-zinc-800/50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-[#FAFAFA] font-bold text-sm">
                    LS
                  </div>
                  <div>
                    <p className="text-[#FAFAFA] text-sm font-bold">Lucía Suárez</p>
                    <p className="text-zinc-500 text-xs">Vencido hace 4 días</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-red-500 text-sm font-bold">$45,00</p>
                    <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-wider">PERSONAL TRAINING</p>
                  </div>
                  <button className="w-10 h-10 rounded-lg border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between border border-zinc-800/50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-[#FAFAFA] font-bold text-sm">
                    AF
                  </div>
                  <div>
                    <p className="text-[#FAFAFA] text-sm font-bold">Andrés Figueroa</p>
                    <p className="text-zinc-500 text-xs">Vencido hoy</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-red-500 text-sm font-bold">$85,00</p>
                    <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-wider">BOXEO ELITE</p>
                  </div>
                  <button className="w-10 h-10 rounded-lg border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/admin/finanzas/mora')}
              className="w-full py-4 rounded-xl border border-zinc-800 text-xs text-zinc-400 font-bold tracking-widest uppercase hover:bg-zinc-900 transition-colors mt-4 cursor-pointer"
            >
              VER LISTA COMPLETA (14)
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 h-full flex flex-col">
          <h2 className="text-sm font-bold text-[#FAFAFA] uppercase tracking-widest mb-6">ESTADOS DE PAGO</h2>
          
          <div className="space-y-6 flex-grow">
            <div className="flex justify-between items-start">
              <div className="flex space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                <p className="text-sm text-zinc-300 pr-4">Cuota Mensual (Oct) - Martin R.</p>
              </div>
              <p className="text-sm text-emerald-500 whitespace-nowrap">$25.000</p>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                <p className="text-sm text-zinc-300 pr-4">Pase Libre - Laura G.</p>
              </div>
              <p className="text-sm text-emerald-500 whitespace-nowrap">$180.000</p>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex space-x-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5"></div>
                <p className="text-sm text-zinc-300 pr-4">Cuota Mensual + Locker - Carlo S.</p>
              </div>
              <p className="text-sm text-yellow-500 whitespace-nowrap">$28.500</p>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
                <p className="text-sm text-zinc-300 pr-4">Clases Personales (x10) - Valeria F.</p>
              </div>
              <p className="text-sm text-red-500 whitespace-nowrap">$45.000</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/admin/finanzas/pagos')}
            className="w-full mt-6 bg-[#7B8B9E] hover:bg-slate-400 text-white font-bold text-sm py-3.5 rounded-xl transition-colors cursor-pointer"
          >
            + Ver más
          </button>
        </div>

      </div>
    </div>
  );
}
