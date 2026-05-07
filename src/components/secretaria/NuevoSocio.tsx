import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NuevoSocio() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0E0E0E] min-h-full p-8 font-sans text-zinc-100">
      
      {/* 1. Encabezado de la Página */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase mb-4">
              SOCIOS
            </p>
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase mb-2">
              NUEVA INSCRIPCIÓN
            </h1>
            <p className="text-sm text-zinc-400">
              Complete los campos para registrar un nuevo atleta en el sistema elite.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Estructura del Formulario */}
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* SECCIÓN A: DATOS PERSONALES */}
        <div className="bg-[#151515] rounded-2xl p-8 border border-zinc-800/30 shadow-xl shadow-black/20">
          <h2 className="text-lg font-bold text-white border-l-4 border-[#7B8B9E] pl-3 mb-6 uppercase tracking-wide">
            DATOS PERSONALES
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                NOMBRE COMPLETO
              </label>
              <input 
                type="text" 
                placeholder="Ej: Juan Pérez" 
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                DNI / PASAPORTE
              </label>
              <input 
                type="text" 
                placeholder="Número de identificación" 
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                TELÉFONO
              </label>
              <input 
                type="text" 
                placeholder="+54 11 0000-0000" 
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                CORREO ELECTRÓNICO
              </label>
              <input 
                type="email" 
                placeholder="usuario@email.com" 
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN B: DECLARACIÓN JURADA DE SALUD */}
        <div className="bg-[#151515] rounded-2xl p-8 border border-zinc-800/30 shadow-xl shadow-black/20">
          <h2 className="text-lg font-bold text-white border-l-4 border-[#7B8B9E] pl-3 mb-6 uppercase tracking-wide">
            DECLARACIÓN JURADA DE SALUD
          </h2>

          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
            ANTECEDENTES MÉDICOS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-zinc-700 bg-[#1A1A1A] flex items-center justify-center group-hover:border-[#7B8B9E] transition-colors"></div>
              <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">¿Padece alguna enfermedad cardiovascular?</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-zinc-700 bg-[#1A1A1A] flex items-center justify-center group-hover:border-[#7B8B9E] transition-colors"></div>
              <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">¿Tiene asma?</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-zinc-700 bg-[#1A1A1A] flex items-center justify-center group-hover:border-[#7B8B9E] transition-colors"></div>
              <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">¿Sufre de presión alta?</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-zinc-700 bg-[#1A1A1A] flex items-center justify-center group-hover:border-[#7B8B9E] transition-colors"></div>
              <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">¿Ha tenido cirugías recientes?</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                MEDICACIÓN ACTUAL
              </label>
              <textarea 
                rows={3}
                placeholder="Detalle medicación actual y dosis..." 
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
              ></textarea>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                ALERGIAS CONOCIDAS
              </label>
              <textarea 
                rows={3}
                placeholder="Liste alergias a medicamentos o alimentos..." 
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
            CONTACTO DE EMERGENCIA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                NOMBRE DEL CONTACTO
              </label>
              <input 
                type="text" 
                placeholder="Nombre completo" 
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                TELÉFONO DE EMERGENCIA
              </label>
              <input 
                type="text" 
                placeholder="+54 11 0000-0000" 
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* SECCIÓN C: TÉRMINOS Y CONFIRMACIÓN */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 border border-zinc-800/50">
            <p className="text-[10px] text-zinc-500 leading-relaxed md:w-[70%]">
              Declaro bajo juramento que los datos consignados en la presente declaración son veraces y exactos. Me comprometo a informar cualquier cambio en mi estado de salud al personal de SquatGym. Asumo la responsabilidad total por la práctica de actividad física dentro de las instalaciones.
            </p>
            <button className="flex items-center px-5 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm font-bold text-white hover:bg-zinc-800 transition-colors whitespace-nowrap">
              <div className="w-4 h-4 rounded border border-zinc-500 mr-3 flex items-center justify-center"></div>
              ACEPTO TÉRMINOS
            </button>
          </div>
        </div>

        {/* 3. Botón de Acción Final */}
        <div className="flex justify-end mt-4 mb-12">
          <button 
            onClick={() => navigate('/secretaria/socios')}
            className="flex items-center px-8 py-4 bg-[#388E3C] hover:bg-emerald-600 text-white text-sm font-black tracking-widest uppercase rounded-full transition-colors shadow-lg shadow-[#388E3C]/20"
          >
            REGISTRAR Y PAGAR
            <ArrowRight className="w-5 h-5 ml-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
