import React from 'react';
import { CheckCircle2, Info, AlertCircle, Sparkles, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  const safeToasts = Array.isArray(toasts) ? toasts : [];
  if (safeToasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      {safeToasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#181818]/95 backdrop-blur-md border border-[#D4AF37] text-white p-3.5 rounded-md shadow-2xl flex items-start gap-3 transform transition-all duration-300 animate-in slide-in-from-top-4"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Sparkles className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'warning' && (
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white leading-snug">{toast.title}</h4>
            {toast.message && (
              <p className="text-[11px] text-[#a1a1aa] mt-0.5 leading-tight">{toast.message}</p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-neutral-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
