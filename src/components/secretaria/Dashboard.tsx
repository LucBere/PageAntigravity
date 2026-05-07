import { Search, Plus, Users, DollarSign, QrCode } from 'lucide-react';

export default function SecretariaDashboard() {
  const asistencias = [
    { id: 1, alumno: 'Juan Pérez', hora: '08:15 AM', estado: 'Check-in exitoso', avatar: 'J' },
    { id: 2, alumno: 'María Gómez', hora: '08:30 AM', estado: 'Check-in exitoso', avatar: 'M' },
    { id: 3, alumno: 'Carlos López', hora: '09:00 AM', estado: 'Check-in exitoso', avatar: 'C' },
    { id: 4, alumno: 'Ana Silva', hora: '09:45 AM', estado: 'Check-in exitoso', avatar: 'A' },
  ];

  const cumpleanos = [
    { id: 1, alumno: 'Pedro Martínez', edad: 25, avatar: 'P' },
    { id: 2, alumno: 'Laura Torres', edad: 31, avatar: 'L' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header & Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Hola Marcos 👋</h1>
          <p className="text-sm text-zinc-400 mt-1">Panel de control rápido - Sede Central</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Socio por DNI, Nombre o Email..."
              className="w-72 bg-[#151515] border border-zinc-800/80 rounded-full py-2.5 pl-11 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-colors"
            />
          </div>
          <button className="flex items-center px-5 py-2.5 bg-[#7B8B9E] hover:bg-[#687a8e] text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-[#7B8B9E]/20">
            <Plus className="w-4 h-4 mr-2" />
            Registro Rápido
          </button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Socios Activos</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-400">2.450</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Total membresías al día</p>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Nuevos Inscritos (Hoy)</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">15</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Registros completados</p>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Asistencias Hoy</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">312</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Accesos registrados</p>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6 border border-zinc-800/50">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Caja Diaria</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#7B8B9E]">$450,300</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Ingresos de la jornada</p>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-[#151515] rounded-3xl p-8 border border-zinc-800/50">
        <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">ACCIONES RÁPIDAS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-6 bg-zinc-900/50 hover:bg-zinc-800 rounded-2xl border border-zinc-800/80 transition-all duration-200 group text-left">
            <div className="w-14 h-14 rounded-full bg-[#7B8B9E]/10 flex items-center justify-center mr-5 group-hover:bg-[#7B8B9E]/20 transition-colors">
              <Users className="w-7 h-7 text-[#7B8B9E]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Registrar Nuevo Socio</h3>
              <p className="text-sm text-zinc-400 mt-1">Alta en sistema y plan</p>
            </div>
          </button>

          <button className="flex items-center p-6 bg-zinc-900/50 hover:bg-zinc-800 rounded-2xl border border-zinc-800/80 transition-all duration-200 group text-left">
            <div className="w-14 h-14 rounded-full bg-[#7B8B9E]/10 flex items-center justify-center mr-5 group-hover:bg-[#7B8B9E]/20 transition-colors">
              <DollarSign className="w-7 h-7 text-[#7B8B9E]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Cobrar Cuota/Venta</h3>
              <p className="text-sm text-zinc-400 mt-1">Procesar pagos y artículos</p>
            </div>
          </button>

          <button className="flex items-center p-6 bg-zinc-900/50 hover:bg-zinc-800 rounded-2xl border border-zinc-800/80 transition-all duration-200 group text-left">
            <div className="w-14 h-14 rounded-full bg-[#7B8B9E]/10 flex items-center justify-center mr-5 group-hover:bg-[#7B8B9E]/20 transition-colors">
              <QrCode className="w-7 h-7 text-[#7B8B9E]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Check-in / Acceso</h3>
              <p className="text-sm text-zinc-400 mt-1">Validar ingreso al gym</p>
            </div>
          </button>
        </div>
      </div>

      {/* Tablas Inferiores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asistencias Recientes */}
        <div className="bg-[#151515] rounded-3xl p-8 border border-zinc-800/50">
          <h2 className="text-lg font-bold text-white mb-6">Asistencias Recientes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800/80 text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Alumno</th>
                  <th className="pb-3 font-medium">Hora</th>
                  <th className="pb-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {asistencias.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">
                          {item.avatar}
                        </div>
                        <span className="text-sm font-medium text-white">{item.alumno}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-bold text-zinc-300">{item.hora}</span>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full mt-4 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors bg-transparent border border-zinc-800 hover:bg-zinc-800/50 rounded-xl">
            Ver todas las asistencias
          </button>
        </div>

        {/* Cumpleaños del Día */}
        <div className="bg-[#151515] rounded-3xl p-8 border border-zinc-800/50">
          <h2 className="text-lg font-bold text-white mb-6">Cumpleaños del Día 🎂</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800/80 text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Alumno</th>
                  <th className="pb-3 font-medium">Edad</th>
                  <th className="pb-3 font-medium">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {cumpleanos.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                          {item.avatar}
                        </div>
                        <span className="text-sm font-medium text-white">{item.alumno}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-bold text-zinc-300">{item.edad} años</span>
                    </td>
                    <td className="py-4">
                      <button className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                        Regalar pase
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full mt-4 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors bg-transparent border border-zinc-800 hover:bg-zinc-800/50 rounded-xl">
            Ver calendario completo
          </button>
        </div>
      </div>
    </div>
  );
}
