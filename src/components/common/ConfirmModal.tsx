import type { ReactNode } from 'react';
import { AlertTriangle, HelpCircle, X } from 'lucide-react';

type Variant = 'danger' | 'default';

interface ConfirmModalProps {
  open: boolean;
  message: ReactNode;
  title?: string;
  variant?: Variant;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantConfig: Record<Variant, { icon: typeof AlertTriangle; iconWrap: string; iconColor: string; confirmBtn: string }> = {
  danger: {
    icon: AlertTriangle,
    iconWrap: 'bg-red-50 dark:bg-red-900/20',
    iconColor: 'text-red-600 dark:text-red-400',
    confirmBtn: 'bg-red-600 hover:bg-red-700 text-white',
  },
  default: {
    icon: HelpCircle,
    iconWrap: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    confirmBtn: 'bg-slate-800 dark:bg-[#6366F1] hover:bg-slate-700 dark:hover:bg-[#4F46E5] text-white',
  },
};

export default function ConfirmModal({
  open,
  message,
  title = '¿Estás seguro?',
  variant = 'default',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  const cfg = variantConfig[variant];
  const Icono = cfg.icon;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl transition-colors relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${cfg.iconWrap}`}>
          <Icono className={`w-6 h-6 ${cfg.iconColor}`} />
        </div>

        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${cfg.confirmBtn}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
