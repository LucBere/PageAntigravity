import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevoUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    fechaNacimiento: '',
    rol: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'nombre' || name === 'apellido') {
      newValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    } else if (name === 'dni') {
      newValue = value.replace(/\D/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const isValid = 
    formData.nombre.trim() !== '' &&
    formData.apellido.trim() !== '' &&
    formData.dni.length === 8 &&
    formData.direccion.trim() !== '' &&
    formData.fechaNacimiento !== '' &&
    formData.rol !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    // Simular carga
    setTimeout(() => {
      setIsLoading(false);
      alert("Usuario creado exitosamente");
      navigate('/admin/usuarios');
    }, 1500);
  };

  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-3xl space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-[2rem] font-bold text-[#FAFAFA] tracking-wide mb-1 uppercase">
          NUEVO USUARIO
        </h1>
        <p className="text-zinc-400 text-sm">
          crea nuevo usuario de la aplicacion
        </p>
      </div>

      {/* Contenedor del Formulario */}
      <div className="bg-[#151515] rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fila 1 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-zinc-500 tracking-wider uppercase font-bold">NOMBRE</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="bg-[#1A1A1A] border border-zinc-800 h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full transition-colors"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-zinc-500 tracking-wider uppercase font-bold">APELLIDO</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                className="bg-[#1A1A1A] border border-zinc-800 h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full transition-colors"
              />
            </div>
          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-zinc-500 tracking-wider uppercase font-bold">DNI</label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                maxLength={8}
                required
                className="bg-[#1A1A1A] border border-zinc-800 h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full transition-colors"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-zinc-500 tracking-wider uppercase font-bold">DIRECCIÓN</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                maxLength={100}
                required
                className="bg-[#1A1A1A] border border-zinc-800 h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full transition-colors"
              />
            </div>
          </div>

          {/* Fila 3 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-zinc-500 tracking-wider uppercase font-bold">FECHA NACIMIENTO</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                max={maxDate}
                required
                className="bg-[#1A1A1A] border border-zinc-800 h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full [color-scheme:dark] transition-colors"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-zinc-500 tracking-wider uppercase font-bold">ROL</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                required
                className="bg-[#1A1A1A] border border-zinc-800 h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full appearance-none transition-colors"
              >
                <option value="" disabled className="text-zinc-500">Seleccione un rol</option>
                <option value="Profesor">Profesor</option>
                <option value="Secretaria">Secretaria</option>
                <option value="Encargado">Encargado</option>
              </select>
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full font-bold text-sm h-12 rounded-xl mt-4 transition-all tracking-wide uppercase ${
              !isValid || isLoading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
                : 'bg-[#7B8B9E] hover:bg-slate-400 text-[#FAFAFA] cursor-pointer'
            }`}
          >
            {isLoading ? 'CREANDO...' : 'CREAR USUARIO'}
          </button>
        </form>
      </div>
    </div>
  );
}

