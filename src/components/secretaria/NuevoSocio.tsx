import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';

export default function NuevoSocio() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    telefono: '',
    email: '',
    plan: '',
    fechaIngreso: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Socio creado exitosamente');
    navigate('/secretaria/socios');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Encabezado */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/secretaria/socios')}
          className="p-2 bg-[#151515] hover:bg-zinc-800 border border-zinc-800/80 rounded-xl transition-colors text-zinc-400 hover:text-white group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Registrar Nuevo Socio</h1>
          <p className="text-sm text-zinc-400 mt-1">Crea un nuevo perfil para el ingreso de un nuevo alumno.</p>
        </div>
      </div>

      {/* 2. Contenedor del Formulario */}
      <div className="bg-zinc-900/60 rounded-2xl p-8 max-w-3xl mx-auto mt-8 border border-zinc-800/50">
        
        {/* 3. Estructura del Formulario */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Fila 1 */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Nombre</label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full h-12 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 text-sm font-bold text-white placeholder-zinc-500 focus:outline-none focus:border-[#7B8B9E] focus:bg-zinc-800 transition-colors"
                placeholder="Ej: Marcos"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Apellido</label>
              <input 
                type="text" 
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                className="w-full h-12 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 text-sm font-bold text-white placeholder-zinc-500 focus:outline-none focus:border-[#7B8B9E] focus:bg-zinc-800 transition-colors"
                placeholder="Ej: Rodriguez"
              />
            </div>

            {/* Fila 2 */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">DNI</label>
              <input 
                type="number" 
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
                className="w-full h-12 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 text-sm font-bold text-white placeholder-zinc-500 focus:outline-none focus:border-[#7B8B9E] focus:bg-zinc-800 transition-colors"
                placeholder="Sin puntos ni espacios"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Dirección</label>
              <input 
                type="text" 
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full h-12 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 text-sm font-bold text-white placeholder-zinc-500 focus:outline-none focus:border-[#7B8B9E] focus:bg-zinc-800 transition-colors"
                placeholder="Calle y número"
              />
            </div>

            {/* Fila 3 */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Teléfono</label>
              <input 
                type="tel" 
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full h-12 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 text-sm font-bold text-white placeholder-zinc-500 focus:outline-none focus:border-[#7B8B9E] focus:bg-zinc-800 transition-colors"
                placeholder="Cód. de área + Número"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Mail</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 text-sm font-bold text-white placeholder-zinc-500 focus:outline-none focus:border-[#7B8B9E] focus:bg-zinc-800 transition-colors"
                placeholder="correo@ejemplo.com"
              />
            </div>

            {/* Fila 4 */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Plan</label>
              <select 
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                required
                className="w-full h-12 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 text-sm font-bold text-white focus:outline-none focus:border-[#7B8B9E] focus:bg-zinc-800 transition-colors appearance-none"
              >
                <option value="" disabled className="text-zinc-500">Seleccionar plan...</option>
                <option value="Anual Musculación">Anual Musculación</option>
                <option value="Musculación Elite">Musculación Elite</option>
                <option value="Mensual Básico">Mensual Básico</option>
                <option value="Cross Training">Cross Training</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Fecha de Ingreso</label>
              <input 
                type="date" 
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleChange}
                required
                className="w-full h-12 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 text-sm font-bold text-white focus:outline-none focus:border-[#7B8B9E] focus:bg-zinc-800 transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* 4. Sección de Resumen */}
          <div className="bg-[#0E0E0E]/50 rounded-xl p-4 border border-zinc-800/50 flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-lg">
              <CreditCard className="w-5 h-5 text-[#7B8B9E]" />
            </div>
            <p className="text-sm text-white font-medium">
              Importe a cobrar: <span className="font-bold text-[#7B8B9E]">$20.000,00</span> - {formData.plan || 'Plan no seleccionado'}
            </p>
          </div>

          {/* 5. Botón de Acción */}
          <button 
            type="submit"
            className="w-full h-12 flex items-center justify-center bg-[#7B8B9E] hover:bg-slate-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-[#7B8B9E]/20"
          >
            CREAR SOCIO
          </button>
        </form>
      </div>
    </div>
  );
}
