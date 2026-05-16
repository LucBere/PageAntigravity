import { useState } from 'react';
import { Banknote, Calendar, Ban, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

export default function Configuracion() {
  const [reglas, setReglas] = useState({
    mora: { activa: true, dias: '15', accion: 'Bloquear Acceso Total' },
    inasistencia: { activa: false, dias: '60', accion: 'Restringir Reserva de Clases' }
  });

  const [guardando, setGuardando] = useState(false);

  const toggleRegla = (tipo: 'mora' | 'inasistencia') => {
    setReglas(prev => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        activa: !prev[tipo].activa
      }
    }));
  };

  const handleDiasChange = (tipo: 'mora' | 'inasistencia', value: string) => {
    // Solo permitir números
    const numValue = value.replace(/\D/g, '');
    setReglas(prev => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        dias: numValue
      }
    }));
  };

  const handleAccionChange = (tipo: 'mora' | 'inasistencia', value: string) => {
    setReglas(prev => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        accion: value
      }
    }));
  };

  const handleGuardarCambios = () => {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      alert("Reglas de negocio actualizadas correctamente en el sistema");
    }, 1000);
  };

  const opcionesAccion = [
    "Bloquear Acceso Total",
    "Restringir Reserva de Clases",
    "Solo Notificar"
  ];

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
        
        {/* Tarjeta 1 (Mora) */}
        <div className={`bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 transition-all ${!reglas.mora.activa ? 'opacity-80' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl ${reglas.mora.activa ? 'bg-blue-900/30 text-blue-400' : 'bg-zinc-800 text-zinc-400'}`}>
                <Banknote className="w-5 h-5" />
              </div>
              <h2 className="text-white font-bold text-lg">Bloqueo por Mora</h2>
            </div>
            {/* Toggle Switch */}
            <div 
              onClick={() => toggleRegla('mora')}
              className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${reglas.mora.activa ? 'bg-[#7B8B9E] justify-end' : 'bg-zinc-700 justify-start'}`}
            >
              <div className={`w-4 h-4 rounded-full shadow-sm transition-all ${reglas.mora.activa ? 'bg-white' : 'bg-zinc-400'}`}></div>
            </div>
          </div>
          
          <div className={`transition-all ${!reglas.mora.activa ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="bg-[#1A1A1A] p-5 rounded-xl flex items-center space-x-3">
              <p className="text-zinc-400 text-sm font-medium">Si el socio adeuda</p>
              <input 
                type="text" 
                value={reglas.mora.dias}
                onChange={(e) => handleDiasChange('mora', e.target.value)}
                disabled={!reglas.mora.activa}
                className="w-16 h-10 bg-[#2A3441] text-white text-center font-bold rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B8B9E]"
              />
              <p className="text-zinc-400 text-sm font-medium">días</p>
            </div>

            <div className="flex items-center mt-4">
              <ArrowRight className="w-5 h-5 text-zinc-500 mx-4" />
              <div className="flex-1 bg-[#1E2631] border border-[#2A3441] p-4 rounded-xl flex items-center justify-between relative">
                <select 
                  value={reglas.mora.accion}
                  onChange={(e) => handleAccionChange('mora', e.target.value)}
                  disabled={!reglas.mora.activa}
                  className="appearance-none w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer pr-8"
                >
                  {opcionesAccion.map(op => <option key={op} value={op} className="bg-zinc-800">{op}</option>)}
                </select>
                <Ban className="w-5 h-5 text-white absolute right-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 (Inasistencia) */}
        <div className={`bg-[#151515] rounded-2xl p-6 border border-zinc-800/50 transition-all ${!reglas.inasistencia.activa ? 'opacity-80' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl ${reglas.inasistencia.activa ? 'bg-orange-900/30 text-orange-400' : 'bg-zinc-800 text-zinc-400'}`}>
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-white font-bold text-lg">Bloqueo por Inasistencia</h2>
            </div>
            {/* Toggle Switch */}
            <div 
              onClick={() => toggleRegla('inasistencia')}
              className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${reglas.inasistencia.activa ? 'bg-[#7B8B9E] justify-end' : 'bg-zinc-700 justify-start'}`}
            >
              <div className={`w-4 h-4 rounded-full shadow-sm transition-all ${reglas.inasistencia.activa ? 'bg-white' : 'bg-zinc-400'}`}></div>
            </div>
          </div>
          
          <div className={`transition-all ${!reglas.inasistencia.activa ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="bg-[#1A1A1A] p-5 rounded-xl flex items-center space-x-3">
              <p className="text-zinc-400 text-sm font-medium">Si el socio no asiste por</p>
              <input 
                type="text" 
                value={reglas.inasistencia.dias}
                onChange={(e) => handleDiasChange('inasistencia', e.target.value)}
                disabled={!reglas.inasistencia.activa}
                className="w-16 h-10 bg-[#2A3441] text-white text-center font-bold rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B8B9E]"
              />
              <p className="text-zinc-400 text-sm font-medium">días</p>
            </div>

            <div className="flex items-center mt-4">
              <ArrowRight className="w-5 h-5 text-zinc-500 mx-4" />
              <div className="flex-1 bg-[#1A1A1A] border border-zinc-800 p-4 rounded-xl flex items-center justify-between relative">
                <select 
                  value={reglas.inasistencia.accion}
                  onChange={(e) => handleAccionChange('inasistencia', e.target.value)}
                  disabled={!reglas.inasistencia.activa}
                  className="appearance-none w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer pr-8"
                >
                  {opcionesAccion.map(op => <option key={op} value={op} className="bg-zinc-800">{op}</option>)}
                </select>
                <AlertTriangle className="w-5 h-5 text-zinc-500 absolute right-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Footer / Acciones */}
      <div className="flex justify-end mt-8 border-t border-zinc-800/50 pt-6">
        <button 
          onClick={handleGuardarCambios}
          disabled={guardando}
          className="flex items-center justify-center bg-[#7B8B9E] hover:bg-slate-400 text-white font-bold px-8 py-3.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
        >
          {guardando ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            'Guardar Cambios'
          )}
        </button>
      </div>

    </div>
  );
}
