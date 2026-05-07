import { AlertCircle, ChevronLeft, ChevronRight, Dumbbell, Flame, Clock, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardSocio() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* 1. Banner de Alerta */}
      <div className="bg-red-950/20 border-l-4 border-l-red-500 p-4 rounded-r-xl flex items-center justify-between">
        <div className="flex items-center space-x-3 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <p className="text-xs font-bold tracking-wider uppercase">¡TU CUOTA VENCE EN 5 DÍAS. EVITA RECARGOS!</p>
        </div>
        <button className="text-xs font-bold text-red-500 tracking-widest uppercase hover:text-red-400 underline underline-offset-4 cursor-pointer">
          VER DETALLES
        </button>
      </div>

      {/* 2. Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Tarjeta Hero (Ocupa 2 col) */}
        <div className="lg:col-span-2 relative bg-[#151515] rounded-3xl overflow-hidden min-h-[300px] flex items-center p-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/90 to-transparent z-10"></div>
          {/* Placeholder imagen fondo */}
          <div className="absolute inset-0 bg-zinc-800/20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop')" }}></div>
          
          <div className="relative z-20 max-w-md">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4">BIENVENIDO DE VUELTA</p>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-8">
              HOLA, JUAN.<br/>
              <span className="text-[#7B8B9E]">¡A DARLE CON TODO HOY!</span>
            </h1>
            <button className="px-8 py-3.5 bg-[#7B8B9E] hover:bg-slate-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors shadow-lg shadow-[#7B8B9E]/20 cursor-pointer">
              VER RUTINA
            </button>
          </div>
        </div>

        {/* Estado Cuenta (Ocupa 1 col) */}
        <div className="bg-[#151515] p-8 rounded-3xl border border-zinc-800/50 flex flex-col justify-between">
          <div>
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">ESTADO DE CUENTA</h2>
            <div className="flex items-baseline space-x-3 mb-2">
              <span className="text-5xl font-normal text-white tracking-tight">$15.000</span>
            </div>
            <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-[#388E3C]/30 bg-[#388E3C]/10 text-[#388E3C] text-[9px] font-bold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-[#388E3C] mr-2"></div>
              AL DÍA
            </div>
          </div>
          <button 
            onClick={() => navigate('/socio/checkout')}
            className="w-full mt-8 py-4 bg-[#388E3C] hover:bg-emerald-600 text-white text-sm font-bold uppercase tracking-widest rounded-2xl transition-colors cursor-pointer"
          >
            PAGAR AHORA
          </button>
        </div>
      </div>

      {/* 3. Calendario Semanal */}
      <div className="bg-[#151515] p-8 rounded-3xl border border-zinc-800/50 mt-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-bold text-white tracking-widest uppercase">OCTUBRE 2023</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-[#1A1A1A] hover:bg-zinc-800 rounded-full border border-zinc-800 transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4 text-zinc-400" />
            </button>
            <button className="p-2 bg-[#1A1A1A] hover:bg-zinc-800 rounded-full border border-zinc-800 transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {[
            { day: 'LUN', date: '14' },
            { day: 'MAR', date: '15' },
            { day: 'MIE', date: '16', active: true },
            { day: 'JUE', date: '17', dot: true },
            { day: 'VIE', date: '18' },
            { day: 'SAB', date: '19', dot: true },
            { day: 'DOM', date: '20' },
          ].map((d, i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-colors cursor-pointer relative ${
                d.active ? 'bg-[#7B8B9E] shadow-lg shadow-[#7B8B9E]/20' : 'hover:bg-zinc-800/30'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${d.active ? 'text-zinc-200' : 'text-zinc-500'}`}>{d.day}</span>
              <span className={`text-xl font-bold ${d.active ? 'text-white' : 'text-zinc-300'}`}>{d.date}</span>
              {d.dot && <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Sección Inferior (Grid 2 columnas) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        
        {/* Izquierda (Mis Próximas Sesiones) */}
        <div className="bg-[#151515] p-8 rounded-3xl border border-zinc-800/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">MIS PRÓXIMAS SESIONES</h2>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">HOY</span>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-2xl p-4 flex items-center justify-between border border-zinc-800/50 hover:bg-zinc-800/40 transition-colors group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
                  <Dumbbell className="w-5 h-5 text-zinc-400 group-hover:text-[#7B8B9E] transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">CROSS TRAINING</h3>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1">WOD: AMRAP 20 MIN</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">18:00<span className="text-xs text-zinc-500">H</span></p>
                <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1">BOX A</p>
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-4 flex items-center justify-between border border-zinc-800/50 hover:bg-zinc-800/40 transition-colors group cursor-pointer opacity-70">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
                  <Flame className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">LEVANTAMIENTO</h3>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1">TÉCNICA: SNATCH</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-zinc-400 line-through decoration-zinc-600">10:30<span className="text-xs text-zinc-500">H</span></p>
                <p className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase mt-1">COMPLETADO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Derecha (Actividad Reciente) */}
        <div className="bg-[#151515] p-8 rounded-3xl border border-zinc-800/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">ACTIVIDAD RECIENTE</h2>
            <Clock className="w-5 h-5 text-zinc-500" />
          </div>

          <div className="space-y-6">
            
            <div className="flex items-start justify-between group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full border border-zinc-700 bg-transparent flex items-center justify-center shrink-0 group-hover:border-zinc-500 transition-colors">
                  <Activity className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-1 group-hover:text-[#7B8B9E] transition-colors">ENTRENAMIENTO DE FUERZA</h3>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-[10px] text-zinc-400 font-bold uppercase tracking-wider"><Flame className="w-3.5 h-3.5 mr-1 text-zinc-500" /> 450 KCAL</span>
                    <span className="flex items-center text-[10px] text-zinc-400 font-bold uppercase tracking-wider"><Clock className="w-3.5 h-3.5 mr-1 text-zinc-500" /> 55 MIN</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1">Ayer</span>
            </div>

            <div className="flex items-start justify-between group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full border border-zinc-700 bg-[#1A1A1A] flex items-center justify-center shrink-0 group-hover:border-zinc-500 transition-colors">
                  <Dumbbell className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wide mb-1 group-hover:text-[#7B8B9E] transition-colors">SESIÓN DE CARDIO</h3>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider"><Flame className="w-3.5 h-3.5 mr-1 text-zinc-600" /> 320 KCAL</span>
                    <span className="flex items-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider"><Clock className="w-3.5 h-3.5 mr-1 text-zinc-600" /> 30 MIN</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase mt-1">Lunes</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
