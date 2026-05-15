import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ModificarUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    rol: ''
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simular carga de datos iniciales
    setTimeout(() => {
      setFormData({
        nombre: 'Sarah',
        apellido: 'Connor',
        direccion: 'Av. Siempre Viva 742',
        rol: 'Secretaria'
      });
      setIsLoadingData(false);
    }, 500);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'nombre' || name === 'apellido') {
      newValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const isValid = 
    formData.nombre.trim() !== '' &&
    formData.apellido.trim() !== '' &&
    formData.direccion.trim() !== '' &&
    formData.rol !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSaving(true);
    // Simular guardado
    setTimeout(() => {
      setIsSaving(false);
      alert("Cambios guardados con éxito");
      navigate('/admin/usuarios');
    }, 1500);
  };

  if (isLoadingData) {
    return (
      <div className="max-w-3xl space-y-8 flex justify-center items-center h-64 text-zinc-500 text-sm">
        Cargando datos del usuario...
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-[2rem] font-bold text-[#FAFAFA] tracking-wide mb-1">
          Modificar usuario
        </h1>
      </div>

      {/* Contenedor del Formulario */}
      <div className="bg-[#151515] rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fila 1 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] text-zinc-500 tracking-wider uppercase font-bold">NOMBRE</label>
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
              <label className="text-[10px] text-zinc-500 tracking-wider uppercase font-bold">APELLIDO</label>
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
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] text-zinc-500 tracking-wider uppercase font-bold">DIRECCIÓN</label>
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

          {/* Fila 3 */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] text-zinc-500 tracking-wider uppercase font-bold">ROL</label>
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

          {/* Botón */}
          <button
            type="submit"
            disabled={!isValid || isSaving}
            className={`w-full font-bold text-sm h-12 rounded-xl mt-4 transition-all tracking-wide uppercase ${
              !isValid || isSaving
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
                : 'bg-[#7B8B9E] hover:bg-slate-400 text-[#FAFAFA] cursor-pointer'
            }`}
          >
            {isSaving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
          </button>
        </form>
      </div>
    </div>
  );
}

