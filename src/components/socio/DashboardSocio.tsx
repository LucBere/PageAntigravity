import { useNavigate } from 'react-router-dom';

export default function DashboardSocio() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300 text-slate-800 dark:text-zinc-100 p-4 md:p-8 font-sans">
      
      {/* 1. Alerta Superior */}
      <div className="w-full mb-6 bg-red-950/20 border border-red-900 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <span className="text-red-600 dark:text-red-500 font-bold text-sm tracking-wide">¡TU CUOTA VENCE EN 5 DÍAS. EVITA RECARGOS!</span>
        </div>
        <button 
          onClick={() => navigate('/socio/pagos')}
          className="text-red-600 dark:text-red-500 font-bold text-sm uppercase tracking-wider cursor-pointer hover:underline hover:text-red-400 transition-colors flex-shrink-0"
        >
          VER DETALLES
        </button>
      </div>

      {/* 2. Tarjetas Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tarjeta Izquierda (Hero) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151515] rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
          <div className="relative z-10">
            <p className="text-slate-500 dark:text-zinc-400 text-sm font-bold tracking-widest mb-2">BIENVENIDO DE VUELTA</p>
            <h1 className="text-slate-900 dark:text-white text-5xl md:text-6xl font-black mb-1 tracking-tight">HOLA, JUAN.</h1>
            <h2 className="text-[#7B8B9E] text-3xl md:text-4xl font-bold tracking-tight">¡A DARLE CON TODO HOY!</h2>
          </div>
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 dark:bg-[#7B8B9E]/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Tarjeta Derecha (Estado de Cuenta) */}
        <div className="bg-white dark:bg-[#151515] rounded-2xl p-8 flex flex-col justify-between border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 h-full transition-colors shadow-sm dark:shadow-none">
          <div>
            <div className="flex justify-between items-start mb-4">
              <p className="text-slate-500 dark:text-zinc-400 text-sm font-bold tracking-widest">ESTADO DE CUENTA</p>
              <div className="flex items-center gap-2 border border-green-500/30 bg-green-500/10 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-green-500 text-xs font-bold tracking-wider">AL DÍA</span>
              </div>
            </div>
            <p className="text-slate-900 dark:text-white text-5xl font-black tracking-tighter mb-6">$15.000</p>
          </div>
          <button 
            onClick={() => navigate('/socio/checkout')}
            className="w-full bg-[#388E3C] hover:bg-green-600 text-slate-900 dark:text-white font-bold py-4 rounded-xl transition-colors tracking-wide shadow-lg shadow-green-900/20"
          >
            PAGAR AHORA
          </button>
        </div>

      </div>

      {/* 3. Calendario Semanal */}
      <div className="w-full bg-white dark:bg-[#151515] rounded-2xl p-6 mt-6 border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-slate-900 dark:text-white font-bold text-lg tracking-wide">OCTUBRE 2023</h3>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-zinc-800 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-zinc-800 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {[
            { day: 'LUN', date: '14' },
            { day: 'MAR', date: '15' },
            { day: 'MIE', date: '16', active: true },
            { day: 'JUE', date: '17', dot: true },
            { day: 'VIE', date: '18' },
            { day: 'SAB', date: '19', dot: true },
            { day: 'DOM', date: '20' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center justify-center py-4 rounded-xl relative transition-colors ${item.active ? 'bg-slate-800 dark:bg-[#7B8B9E] text-white shadow-lg shadow-[#7B8B9E]/20' : 'bg-slate-200 dark:bg-slate-100 dark:bg-zinc-900/50 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:bg-zinc-800'}`}
            >
              {item.dot && (
                <div className="absolute top-2 w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
              )}
              <span className={`text-xs font-bold mb-1 ${item.active ? 'text-slate-900 dark:text-white/80' : 'text-slate-500 dark:text-zinc-500'}`}>{item.day}</span>
              <span className={`text-xl font-black ${item.active ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-zinc-300'}`}>{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tarjetas Inferiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* Mis Próximas Sesiones */}
        <div className="bg-white dark:bg-[#151515] rounded-2xl p-6 border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-500 dark:text-zinc-400 text-xs font-bold tracking-widest uppercase">Mis Próximas Sesiones</h3>
            <span className="text-slate-500 dark:text-zinc-500 text-xs font-bold bg-slate-200 dark:bg-zinc-900 px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-800">HOY</span>
          </div>
          
          <div className="bg-slate-200 dark:bg-slate-100 dark:bg-zinc-900/50 border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 rounded-xl p-4 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#7B8B9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-[#7B8B9E] transition-colors">CROSS TRAINING</h4>
                <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium">18:00H - Zona Funcional</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white dark:bg-[#151515] rounded-2xl p-6 border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 transition-colors shadow-sm dark:shadow-none">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-500 dark:text-zinc-400 text-xs font-bold tracking-widest uppercase">Actividad Reciente</h3>
          </div>
          
          <div className="bg-slate-200 dark:bg-slate-100 dark:bg-zinc-900/50 border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 rounded-xl p-4 flex items-center justify-between hover:bg-slate-100 dark:bg-slate-100 dark:bg-zinc-800/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold group-hover:text-green-500 transition-colors">ENTRENAMIENTO DE FUERZA</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-500 dark:text-zinc-400 text-xs font-semibold">Ayer</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span className="text-slate-500 dark:text-zinc-500 text-xs font-medium">450 kcal</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span className="text-slate-500 dark:text-zinc-500 text-xs font-medium">55 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
