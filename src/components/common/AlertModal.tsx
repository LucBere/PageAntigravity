import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

type Variant = 'success' | 'info' | 'warning';

interface AlertModalProps {
  open: boolean;
  message: string;
  title?: string;
  variant?: Variant;
  confirmLabel?: string;
  onClose: () => void;
}

const variantConfig: Record<Variant, { icon: typeof Info; iconWrap: string; iconColor: string; defaultTitle: string }> = {
  success: {
    icon: CheckCircle2,
    iconWrap: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    defaultTitle: 'Listo',
  },
  info: {
    icon: Info,
    iconWrap: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    defaultTitle: 'Información',
  },
  warning: {
    icon: AlertTriangle,
    iconWrap: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    defaultTitle: 'Atención',
  },
};

export default function AlertModal({
  open,
  message,
  title,
  variant = 'success',
  confirmLabel = 'Aceptar',
  onClose,
}: AlertModalProps) {
  if (!open) return null;

  const cfg = variantConfig[variant];
  const Icono = cfg.icon;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl transition-colors relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${cfg.iconWrap}`}>
          <Icono className={`w-6 h-6 ${cfg.iconColor}`} />
        </div>

        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          {title ?? cfg.defaultTitle}
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-8 leading-relaxed">
          {message}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-slate-800 dark:bg-[#6366F1] hover:bg-slate-700 dark:hover:bg-[#4F46E5] text-white text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
