import { AlertTriangle, PlusCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotificacionesSocio() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto pb-12">
      
      {/* 1. Encabezado y Filtros */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
            NOTIFICACIONES
          </h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#7B8B9E]"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              TIENES 3 MENSAJES SIN LEER
            </span>
          </div>
        </div>
        <button className="px-4 py-3 md:py-2 bg-[#1A1A1A] hover:bg-zinc-800 text-xs font-bold text-white tracking-widest uppercase rounded-lg transition-colors border border-zinc-800/50 h-fit cursor-pointer">
          MARCAR TODAS COMO LEÍDAS
        </button>
      </div>

      {/* Fila de Filtros (Pills) */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        <button className="px-8 py-3 bg-[#7B8B9E] text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer shrink-0">
          TODAS
        </button>
        <button className="px-8 py-3 bg-[#1A1A1A] hover:bg-zinc-800 text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer border border-zinc-800/50 shrink-0">
          NO LEÍDAS
        </button>
        <button className="px-8 py-3 bg-[#1A1A1A] hover:bg-zinc-800 text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer border border-zinc-800/50 shrink-0">
          IMPORTANTES
        </button>
      </div>

      {/* 2. Lista de Notificaciones */}
      <div className="space-y-4">
        
        {/* Tarjeta 1 (URGENTE) */}
        <div className="bg-[#151515] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-zinc-800/50 shadow-lg shadow-black/20">
          <div className="flex items-start md:items-center">
            <div className="w-12 h-12 rounded-xl bg-orange-950/30 flex items-center justify-center shrink-0 border border-orange-900/30 mt-1 md:mt-0">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="ml-5">
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">URGENTE</span>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">HACE 2 HORAS</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-1">TU CUOTA VENCE MAÑANA</h3>
              <p className="text-sm text-zinc-400">Recuerda realizar el pago para evitar recargos. Tu membresía actual expira en menos de 24 horas.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/socio/checkout')}
            className="w-full md:w-auto px-8 py-4 bg-[#FF6B6B] hover:bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#FF6B6B]/20 text-center"
          >
            PAGAR AHORA
          </button>
        </div>

        {/* Tarjeta 2 (NOVEDAD) */}
        <div className="bg-[#151515] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-zinc-800/50 shadow-lg shadow-black/20">
          <div className="flex items-start md:items-center">
            <div className="w-12 h-12 rounded-xl bg-[#7B8B9E]/10 flex items-center justify-center shrink-0 border border-[#7B8B9E]/20 mt-1 md:mt-0">
              <PlusCircle className="w-5 h-5 text-[#7B8B9E]" />
            </div>
            <div className="ml-5">
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-[10px] font-bold text-[#7B8B9E] uppercase tracking-widest">NOVEDAD</span>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">HACE 5 HORAS</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-1">NUEVA CLASE DISPONIBLE</h3>
              <p className="text-sm text-zinc-400">Se ha añadido una sesión de CrossFit los jueves a las 19:00. ¡Reserva tu lugar ahora!</p>
            </div>
          </div>
          <button className="w-full md:w-auto px-8 py-4 bg-[#7B8B9E] hover:bg-slate-400 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#7B8B9E]/20 text-center">
            VER HORARIOS
          </button>
        </div>

        {/* Tarjeta 3 (INFORMATIVO) */}
        <div className="bg-[#151515] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-zinc-800/50 border-l-2 border-l-[#7B8B9E] shadow-lg shadow-black/20">
          <div className="flex items-start md:items-center">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center shrink-0 border border-zinc-800 mt-1 md:mt-0">
              <Info className="w-5 h-5 text-zinc-400" />
            </div>
            <div className="ml-5">
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">INFORMATIVO</span>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">AYER</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-1">CAMBIO EN SALA 4</h3>
              <p className="text-sm text-zinc-400">La clase de Yoga se traslada temporalmente a la Sala 2 por mantenimiento.</p>
            </div>
          </div>
          <button className="w-full md:w-auto px-8 py-4 bg-[#7B8B9E] hover:bg-slate-400 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#7B8B9E]/20 text-center">
            ENTENDIDO
          </button>
        </div>

      </div>
    </div>
  );
}
