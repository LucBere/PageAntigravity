import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

type Variant = 'toolbar' | 'panel';

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  icon?: ReactNode;
  active?: boolean;
  ariaLabel?: string;
  variant?: Variant;
  className?: string;
}

const VARIANTS: Record<Variant, { base: string; idle: string; active: string }> = {
  toolbar: {
    base: 'rounded-xl py-3 shadow-sm dark:shadow-none',
    idle: 'bg-white dark:bg-[#151515] border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-[#FAFAFA] hover:border-slate-300 dark:hover:border-zinc-700',
    active: 'bg-slate-100 dark:bg-zinc-800 border-slate-400 dark:border-zinc-600 text-slate-900 dark:text-white font-semibold',
  },
  panel: {
    base: 'rounded-lg h-10',
    idle: 'bg-slate-50 dark:bg-[#1A1A1A] border-slate-200 dark:border-transparent text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-zinc-700',
    active: 'bg-slate-100 dark:bg-zinc-800 border-slate-400 dark:border-zinc-600 text-slate-900 dark:text-white font-semibold',
  },
};

export default function FilterSelect({
  value,
  onChange,
  options,
  icon,
  active = false,
  ariaLabel,
  variant = 'toolbar',
  className = '',
}: FilterSelectProps) {
  const v = VARIANTS[variant];
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none flex items-center">
          {icon}
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className={`appearance-none w-full border text-sm cursor-pointer transition-colors focus:outline-none ${icon ? 'pl-10' : 'pl-4'} pr-10 ${v.base} ${active ? v.active : v.idle}`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
    </div>
  );
}
