import { useState, useMemo, type FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, User, Shield, AlertTriangle } from 'lucide-react';
import { searchEntries, type SearchCategoria } from '../../data/globalSearch';

const categoriaStyle: Record<SearchCategoria, { badge: string; icon: typeof User }> = {
  Socio: {
    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50',
    icon: User,
  },
  Usuario: {
    badge: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50',
    icon: Shield,
  },
  Deudor: {
    badge: 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50',
    icon: AlertTriangle,
  },
};

export default function GlobalSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryInicial = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(queryInicial);

  const resultados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchEntries.filter((e) =>
      e.nombre.toLowerCase().includes(q) ||
      (e.dni ?? '').includes(q) ||
      (e.email ?? '').toLowerCase().includes(q) ||
      e.detalle.toLowerCase().includes(q) ||
      e.categoria.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {});
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#0E0E0E] dark:text-zinc-100 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold tracking-widest uppercase cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        {/* Encabezado */}
        <h1 className="text-[2.5rem] font-black tracking-tighter mb-2 uppercase leading-none text-slate-900 dark:text-[#FAFAFA]">
          BÚSQUEDA GLOBAL
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 text-sm mb-8">
          Buscá socios, personal o deudores en todo el sistema por nombre, DNI o email.
        </p>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSubmit} className="relative mb-8">
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribí un nombre, DNI o email..."
            className="w-full bg-white border border-slate-300 dark:bg-[#151515] dark:border-zinc-800 rounded-full py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 dark:text-zinc-200 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 transition-colors shadow-sm dark:shadow-none"
          />
        </form>

        {/* Resultados */}
        {query.trim() === '' ? (
          <p className="text-center text-slate-400 dark:text-zinc-600 text-sm py-16">
            Empezá a escribir para ver resultados.
          </p>
        ) : resultados.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-zinc-500 text-sm py-16">
            No se encontraron coincidencias para <strong className="text-slate-900 dark:text-white">"{query}"</strong>.
          </p>
        ) : (
          <>
            <p className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-4">
              {resultados.length} resultado{resultados.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-3">
              {resultados.map((r) => {
                const estilo = categoriaStyle[r.categoria];
                const Icono = estilo.icon;
                return (
                  <button
                    key={r.id}
                    onClick={() => navigate(r.ruta)}
                    className="w-full flex items-center justify-between text-left bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800/50 rounded-2xl px-6 py-4 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer shadow-sm dark:shadow-none"
                  >
                    <div className="flex items-center space-x-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 shrink-0">
                        <Icono className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-[#FAFAFA] truncate">{r.nombre}</p>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-500 truncate">
                          {r.dni ? `DNI: ${r.dni}` : r.email} · {r.detalle}
                        </p>
                      </div>
                    </div>
                    <span className={`shrink-0 ml-4 inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${estilo.badge}`}>
                      {r.categoria}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
