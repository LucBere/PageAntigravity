import { useNavigate } from 'react-router-dom';

export default function ModificarUsuario() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular carga
    setTimeout(() => {
      alert("Cambios guardados con éxito");
      navigate('/admin/usuarios');
    }, 500);
  };

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
                required
                className="bg-[#1A1A1A] h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] text-zinc-500 tracking-wider uppercase font-bold">APELLIDO</label>
              <input
                type="text"
                required
                className="bg-[#1A1A1A] h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full"
              />
            </div>
          </div>

          {/* Fila 2 */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] text-zinc-500 tracking-wider uppercase font-bold">DIRECCIÓN</label>
            <input
              type="text"
              required
              className="bg-[#1A1A1A] h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full"
            />
          </div>

          {/* Fila 3 */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] text-zinc-500 tracking-wider uppercase font-bold">ROL</label>
            <select
              required
              defaultValue=""
              className="bg-[#1A1A1A] h-12 rounded-xl px-4 text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-zinc-700 w-full appearance-none"
            >
              <option value="" disabled className="text-zinc-500">Seleccione un rol</option>
              <option value="secretaria">Secretaria</option>
              <option value="administrador">Administrador</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#7B8B9E] hover:bg-slate-400 text-white font-bold text-sm h-12 rounded-xl mt-4 transition-colors tracking-wide uppercase"
          >
            GUARDAR CAMBIOS
          </button>
        </form>
      </div>
    </div>
  );
}
