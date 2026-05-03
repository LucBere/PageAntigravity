import { Banknote, Calendar, Ban, AlertTriangle, ArrowRight } from 'lucide-react';

export default function Configuracion() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* 1. Encabezado */}
      <div>
        <h1 className="text-[3rem] font-black text-[#FAFAFA] tracking-tighter mb-2 uppercase leading-none">
          REGLAS DE NEGOCIO
        </h1>
        <p className="text-zinc-400 text-sm max-w-3xl">
          Centraliza las restricciones lógicas y automatizaciones del ecosistema de SquatGym para mantener la excelencia operativa.
        </p>
      </div>

      {/* 2. Tarjetas de Reglas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Tarjeta 1 (Activo) */}
        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-900/30 text-blue-400 p-2.5 rounded-xl">
                <Banknote className="w-5 h-5" />
              </div>
              <h2 className="text-white font-bold text-lg">Bloqueo por Mora</h2>
            </div>
            {/* Toggle Switch Encendido */}
            <div className="w-12 h-6 bg-[#7B8B9E] rounded-full flex items-center justify-end px-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
          
          <div className="bg-[#1A1A1A] p-5 rounded-xl flex items-center space-x-3">
            <p className="text-zinc-400 text-sm font-medium">Si el socio adeuda</p>
            <input 
              type="text" 
              defaultValue="15" 
              className="w-16 h-10 bg-[#2A3441] text-white text-center font-bold rounded-lg focus:outline-none"
            />
            <p className="text-zinc-400 text-sm font-medium">días</p>
          </div>

          <div className="flex items-center mt-4">
            <ArrowRight className="w-5 h-5 text-zinc-500 mx-4" />
            <div className="flex-1 bg-[#1E2631] border border-[#2A3441] p-4 rounded-xl flex items-center justify-between">
              <span className="text-white font-bold text-sm">Bloquear Acceso</span>
              <Ban className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Tarjeta 2 (Inactivo) */}
        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 opacity-80">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-zinc-800 text-zinc-400 p-2.5 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-white font-bold text-lg">Bloqueo por Inasistencia</h2>
            </div>
            {/* Toggle Switch Apagado */}
            <div className="w-12 h-6 bg-zinc-800 rounded-full flex items-center justify-start px-1 cursor-pointer">
              <div className="w-4 h-4 bg-zinc-400 rounded-full shadow-sm"></div>
            </div>
          </div>
          
          <div className="bg-[#1A1A1A] p-5 rounded-xl flex items-center space-x-3">
            <p className="text-zinc-500 text-sm font-medium">Si el socio no asiste por</p>
            <input 
              type="text" 
              defaultValue="60" 
              className="w-16 h-10 bg-[#242424] text-zinc-400 text-center font-bold rounded-lg focus:outline-none"
            />
            <p className="text-zinc-500 text-sm font-medium">días</p>
          </div>

          <div className="flex items-center mt-4">
            <ArrowRight className="w-5 h-5 text-zinc-600 mx-4" />
            <div className="flex-1 bg-[#1A1A1A] border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
              <span className="text-zinc-500 font-bold text-sm">Restringir Acceso</span>
              <AlertTriangle className="w-5 h-5 text-zinc-500" />
            </div>
          </div>
        </div>

      </div>

      {/* 3. Footer / Acciones */}
      <div className="flex justify-end mt-8 border-t border-zinc-800/50 pt-6">
        <button className="bg-[#7B8B9E] hover:bg-slate-400 text-white font-bold px-8 py-3.5 rounded-xl transition-colors cursor-pointer">
          Guardar Cambios
        </button>
      </div>

    </div>
  );
}
