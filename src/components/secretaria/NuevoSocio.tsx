import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevoSocio() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    email: '',
  });
  const [emailError, setEmailError] = useState(false);

  // Estados de Salud y Emergencia
  const [salud, setSalud] = useState({
    cardiovascular: false,
    asma: false,
    presionAlta: false,
    cirugias: false,
  });
  const [medicacion, setMedicacion] = useState('');
  const [alergias, setAlergias] = useState('');
  
  const [contactoEmergencia, setContactoEmergencia] = useState({
    nombre: '',
    telefono: '',
  });
  
  const [terminosAceptados, setTerminosAceptados] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-[#0E0E0E] min-h-full p-8 font-sans text-zinc-100">

      {/* 1. Encabezado de la Página */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 tracking-[0.2em] uppercase mb-4">
              SOCIOS
            </p>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-2">
              NUEVA INSCRIPCIÓN
            </h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Complete los campos para registrar un nuevo atleta en el sistema elite.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Estructura del Formulario */}
      <div className="max-w-4xl mx-auto flex flex-col gap-8">

        {/* SECCIÓN A: DATOS PERSONALES */}
        <div className="bg-white dark:bg-[#151515] rounded-2xl p-8 border border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 shadow-xl shadow-black/20 transition-colors shadow-sm dark:shadow-none">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-[#7B8B9E] pl-3 mb-6 uppercase tracking-wide">
            DATOS PERSONALES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
                NOMBRE COMPLETO
              </label>
              <input
                type="text"
                placeholder="Ej: Juan Pérez"
                value={formData.nombre}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                  setFormData({...formData, nombre: val});
                }}
                className="w-full bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder-zinc-600 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
                DNI / PASAPORTE
              </label>
              <input
                type="text"
                placeholder="Número de identificación"
                maxLength={8}
                value={formData.dni}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setFormData({...formData, dni: val});
                }}
                className="w-full bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder-zinc-600 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
                TELÉFONO
              </label>
              <input
                type="text"
                placeholder="+54 11 0000-0000"
                maxLength={15}
                value={formData.telefono}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9\s\-+]/g, '');
                  setFormData({...formData, telefono: val});
                }}
                className="w-full bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder-zinc-600 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
                CORREO ELECTRÓNICO
              </label>
              <input
                type="email"
                placeholder="usuario@email.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (emailError) setEmailError(false);
                }}
                onBlur={(e) => {
                  const val = e.target.value;
                  if (val.length > 0 && (!val.includes('@') || !val.includes('.com'))) {
                    setEmailError(true);
                  } else {
                    setEmailError(false);
                  }
                }}
                className={`w-full bg-slate-50 dark:bg-[#1A1A1A] border ${emailError ? 'border-red-500/50 focus:border-red-500/50' : 'border-slate-200 dark:border-zinc-800 focus:border-slate-400 dark:focus:border-zinc-600'} rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder-zinc-600 focus:outline-none transition-colors`}
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN B: DECLARACIÓN JURADA DE SALUD */}
        <div className="bg-white dark:bg-[#151515] rounded-2xl p-8 border border-slate-100 dark:border-slate-200 dark:border-zinc-800/30 shadow-xl shadow-black/20 transition-colors shadow-sm dark:shadow-none">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-[#7B8B9E] pl-3 mb-6 uppercase tracking-wide">
            DECLARACIÓN JURADA DE SALUD
          </h2>

          <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-4">
            ANTECEDENTES MÉDICOS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <label className="flex items-center space-x-3 cursor-pointer group" onClick={() => setSalud({...salud, cardiovascular: !salud.cardiovascular})}>
              <div className={`w-5 h-5 rounded border ${salud.cardiovascular ? 'bg-slate-800 dark:bg-[#7B8B9E] border-[#7B8B9E]' : 'border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-[#1A1A1A] group-hover:border-[#7B8B9E]'} flex items-center justify-center transition-colors`}>
                {salud.cardiovascular && <Check className="w-3 h-3 text-slate-900 dark:text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm text-slate-500 dark:text-zinc-400 group-hover:text-slate-600 dark:text-zinc-300 transition-colors">¿Padece alguna enfermedad cardiovascular?</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group" onClick={() => setSalud({...salud, asma: !salud.asma})}>
              <div className={`w-5 h-5 rounded border ${salud.asma ? 'bg-slate-800 dark:bg-[#7B8B9E] border-[#7B8B9E]' : 'border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-[#1A1A1A] group-hover:border-[#7B8B9E]'} flex items-center justify-center transition-colors`}>
                {salud.asma && <Check className="w-3 h-3 text-slate-900 dark:text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm text-slate-500 dark:text-zinc-400 group-hover:text-slate-600 dark:text-zinc-300 transition-colors">¿Tiene asma?</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group" onClick={() => setSalud({...salud, presionAlta: !salud.presionAlta})}>
              <div className={`w-5 h-5 rounded border ${salud.presionAlta ? 'bg-slate-800 dark:bg-[#7B8B9E] border-[#7B8B9E]' : 'border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-[#1A1A1A] group-hover:border-[#7B8B9E]'} flex items-center justify-center transition-colors`}>
                {salud.presionAlta && <Check className="w-3 h-3 text-slate-900 dark:text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm text-slate-500 dark:text-zinc-400 group-hover:text-slate-600 dark:text-zinc-300 transition-colors">¿Sufre de presión alta?</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group" onClick={() => setSalud({...salud, cirugias: !salud.cirugias})}>
              <div className={`w-5 h-5 rounded border ${salud.cirugias ? 'bg-slate-800 dark:bg-[#7B8B9E] border-[#7B8B9E]' : 'border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-[#1A1A1A] group-hover:border-[#7B8B9E]'} flex items-center justify-center transition-colors`}>
                {salud.cirugias && <Check className="w-3 h-3 text-slate-900 dark:text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm text-slate-500 dark:text-zinc-400 group-hover:text-slate-600 dark:text-zinc-300 transition-colors">¿Ha tenido cirugías recientes?</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
                MEDICACIÓN ACTUAL
              </label>
              <textarea
                rows={3}
                maxLength={250}
                value={medicacion}
                onChange={(e) => setMedicacion(e.target.value)}
                placeholder="Detalle medicación actual y dosis..."
                className="w-full bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder-zinc-600 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors resize-none"
              ></textarea>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
                ALERGIAS CONOCIDAS
              </label>
              <textarea
                rows={3}
                maxLength={250}
                value={alergias}
                onChange={(e) => setAlergias(e.target.value)}
                placeholder="Liste alergias a medicamentos o alimentos..."
                className="w-full bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder-zinc-600 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-4">
            CONTACTO DE EMERGENCIA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
                NOMBRE DEL CONTACTO
              </label>
              <input
                type="text"
                value={contactoEmergencia.nombre}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                  setContactoEmergencia({...contactoEmergencia, nombre: val});
                }}
                placeholder="Nombre completo"
                className="w-full bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder-zinc-600 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
                TELÉFONO DE EMERGENCIA
              </label>
              <input
                type="text"
                value={contactoEmergencia.telefono}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9\s\-+]/g, '');
                  setContactoEmergencia({...contactoEmergencia, telefono: val});
                }}
                placeholder="+54 11 0000-0000"
                className="w-full bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder-zinc-600 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* SECCIÓN C: TÉRMINOS Y CONFIRMACIÓN */}
          <div className="bg-slate-50 dark:bg-[#1A1A1A] p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50">
            <p className="text-[10px] text-slate-500 dark:text-zinc-500 leading-relaxed md:w-[70%]">
              Declaro bajo juramento que los datos consignados en la presente declaración son veraces y exactos. Me comprometo a informar cualquier cambio en mi estado de salud al personal de SquatGym. Asumo la responsabilidad total por la práctica de actividad física dentro de las instalaciones.
            </p>
            <button 
              onClick={() => setTerminosAceptados(!terminosAceptados)}
              className="flex items-center px-5 py-3 bg-slate-200 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
            >
              <div className={`w-4 h-4 rounded border ${terminosAceptados ? 'bg-slate-800 dark:bg-[#7B8B9E] border-[#7B8B9E]' : 'border-zinc-500'} mr-3 flex items-center justify-center transition-colors`}>
                {terminosAceptados && <Check className="w-3 h-3 text-slate-900 dark:text-white" strokeWidth={3} />}
              </div>
              ACEPTO TÉRMINOS
            </button>
          </div>
        </div>

        {/* 3. Botón de Acción Final */}
        <div className="flex justify-end mt-4 mb-12">
          <button
            onClick={() => navigate('/secretaria/socios')}
            disabled={!terminosAceptados}
            className={`flex items-center px-8 py-4 bg-[#388E3C] text-slate-900 dark:text-white text-sm font-black tracking-widest uppercase rounded-full transition-colors shadow-lg shadow-[#388E3C]/20 ${!terminosAceptados ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'}`}
          >
            REGISTRAR Y PAGAR
            <ArrowRight className="w-5 h-5 ml-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
