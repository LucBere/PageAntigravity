import { useNavigate } from 'react-router-dom';
import { Mail, Send, Bell, AlertTriangle, TrendingUp } from 'lucide-react';

export default function CajaPagos() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-slate-800 dark:bg-[#7B8B9E] transition-colors"></div>
          <span className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold transition-colors">ESTADO DE CUENTA REAL</span>
        </div>
        <h1 className="text-[2.5rem] leading-tight font-bold text-slate-900 dark:text-[#FAFAFA] tracking-wide mb-2 uppercase transition-colors">
          CAJA / PAGOS
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-2xl transition-colors">
          Gestión de flujo de efectivo, recuperación de cartera y alertas de morosidad automatizadas.
        </p>
      </div>

      {/* Estructura del Layout Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tarjetas KPI */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#151515] rounded-2xl p-6 border border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
              <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-4 transition-colors">RECAUDADO HOY</p>
              <p className="text-4xl font-normal text-slate-900 dark:text-[#FAFAFA] mb-2 transition-colors">$4.250,00</p>
              <p className="text-emerald-600 dark:text-emerald-500 text-xs font-medium flex items-center transition-colors">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% vs ayer
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#151515] rounded-2xl p-6 border border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
              <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-4 transition-colors">DEUDA PENDIENTE</p>
              <p className="text-4xl font-normal text-slate-900 dark:text-[#FAFAFA] mb-2 transition-colors">$1.840,00</p>
              <p className="text-red-600 dark:text-red-500 text-xs font-medium flex items-center transition-colors">
                <AlertTriangle className="w-3 h-3 mr-1" />
                14 Clientes en mora
              </p>
            </div>
          </div>

          {/* Sección Clientes en Mora */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-[#FAFAFA] uppercase tracking-widest transition-colors">CLIENTES EN MORA</h2>
              <span className="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-500 text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-wider border border-red-200 dark:border-red-500/20 transition-colors">
                CRÍTICO
              </span>
            </div>

            {/* Lista */}
            <div className="space-y-3">
              {/* Item 1 */}
              <div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between border border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 dark:bg-zinc-800 flex items-center justify-center dark:text-[#FAFAFA] font-bold text-sm transition-colors">
                    RM
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-[#FAFAFA] text-sm font-bold transition-colors">Ricardo Mendoza</p>
                    <p className="text-slate-500 dark:text-zinc-500 text-xs transition-colors">Vencido hace 12 días</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-red-600 dark:text-red-500 text-sm font-bold transition-colors">$120,00</p>
                    <p className="text-slate-500 dark:text-zinc-600 text-[10px] uppercase font-bold tracking-wider transition-colors">PLAN ANUAL</p>
                  </div>
                  <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-400 dark:text-zinc-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between border border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 dark:bg-zinc-800 flex items-center justify-center dark:text-[#FAFAFA] font-bold text-sm transition-colors">
                    LS
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-[#FAFAFA] text-sm font-bold transition-colors">Lucía Suárez</p>
                    <p className="text-slate-500 dark:text-zinc-500 text-xs transition-colors">Vencido hace 4 días</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-red-600 dark:text-red-500 text-sm font-bold transition-colors">$45,00</p>
                    <p className="text-slate-500 dark:text-zinc-600 text-[10px] uppercase font-bold tracking-wider transition-colors">PERSONAL TRAINING</p>
                  </div>
                  <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-400 dark:text-zinc-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between border border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 dark:bg-zinc-800 flex items-center justify-center dark:text-[#FAFAFA] font-bold text-sm transition-colors">
                    AF
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-[#FAFAFA] text-sm font-bold transition-colors">Andrés Figueroa</p>
                    <p className="text-slate-500 dark:text-zinc-500 text-xs transition-colors">Vencido hoy</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-red-600 dark:text-red-500 text-sm font-bold transition-colors">$85,00</p>
                    <p className="text-slate-500 dark:text-zinc-600 text-[10px] uppercase font-bold tracking-wider transition-colors">BOXEO ELITE</p>
                  </div>
                  <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-400 dark:text-zinc-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/admin/finanzas/mora')}
              className="w-full py-4 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs text-slate-500 dark:text-zinc-400 font-bold tracking-widest uppercase hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors mt-4 cursor-pointer"
            >
              VER LISTA COMPLETA (14)
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="bg-white dark:bg-[#151515] rounded-2xl p-6 border border-slate-200 dark:border-zinc-800/50 h-full flex flex-col transition-colors shadow-sm dark:shadow-none">
          <h2 className="text-sm font-bold text-slate-900 dark:text-[#FAFAFA] uppercase tracking-widest mb-6 transition-colors">ESTADOS DE PAGO</h2>
          
          <div className="space-y-6 flex-grow">
            <div className="flex justify-between items-start">
              <div className="flex space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                <p className="text-sm text-slate-600 dark:text-zinc-300 pr-4 transition-colors">Cuota Mensual (Oct) - Martin R.</p>
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-500 whitespace-nowrap transition-colors">$25.000</p>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                <p className="text-sm text-slate-600 dark:text-zinc-300 pr-4 transition-colors">Pase Libre - Laura G.</p>
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-500 whitespace-nowrap transition-colors">$180.000</p>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex space-x-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5"></div>
                <p className="text-sm text-slate-600 dark:text-zinc-300 pr-4 transition-colors">Cuota Mensual + Locker - Carlo S.</p>
              </div>
              <p className="text-sm text-yellow-600 dark:text-yellow-500 whitespace-nowrap transition-colors">$28.500</p>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
                <p className="text-sm text-slate-600 dark:text-zinc-300 pr-4 transition-colors">Clases Personales (x10) - Valeria F.</p>
              </div>
              <p className="text-sm text-red-600 dark:text-red-500 whitespace-nowrap transition-colors">$45.000</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/admin/finanzas/pagos')}
            className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white dark:bg-[#7B8B9E] dark:hover:bg-slate-400 font-bold text-sm py-3.5 rounded-xl transition-colors cursor-pointer"
          >
            + Ver más
          </button>
        </div>

      </div>
    </div>
  );
}
