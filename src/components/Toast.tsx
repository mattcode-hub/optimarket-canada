'use client';

import { useEffect, useState, ReactNode } from 'react';
import { Toast as ToastType } from '@/context/ToastContext';
import { Check, X, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

export default function Toast({ toast, onRemove }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  const typeStyles: Record<string, { bg: string; icon: ReactNode; text: string }> = {
    success: {
      bg: 'bg-success/10 border-success/20',
      icon: <Check className="h-5 w-5 text-success" />,
      text: 'text-success',
    },
    error: {
      bg: 'bg-error/10 border-error/20',
      icon: <X className="h-5 w-5 text-error" />,
      text: 'text-error',
    },
    warning: {
      bg: 'bg-warning/10 border-warning/20',
      icon: <AlertCircle className="h-5 w-5 text-warning" />,
      text: 'text-warning',
    },
    info: {
      bg: 'bg-accent-100/40 border-accent-200/40',
      icon: <Info className="h-5 w-5 text-accent-600" />,
      text: 'text-accent-700',
    },
  };

  const style = typeStyles[toast.type] || typeStyles.info;

  return (
    <div
      className={`transform transition-all duration-300 ${
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}
    >
      <div
        className={`flex items-center gap-3 rounded-lg border px-4 py-3 backdrop-blur-sm ${style.bg}`}
        role="alert"
      >
        {style.icon}
        <p className={`text-sm font-medium ${style.text}`}>{toast.message}</p>
        <button
          onClick={handleClose}
          className="ml-auto flex-shrink-0 text-neutral-400 transition-colors hover:text-neutral-600"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
