// filepath: sae-frontend/components/ui/toaster.tsx
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export type ToastVariant = "default" | "success" | "error" | "warning";

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  durationMs?: number;
}

interface ToastItem extends Required<ToastOptions> {}

interface ToastContextValue {
  toast: (opts: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToasterProvider />");
  return ctx;
}

export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (opts: ToastOptions) => {
      const id = opts.id ?? `t_${Date.now()}_${counter.current++}`;
      const variant = opts.variant ?? "default";
      const durationMs = opts.durationMs ?? 3000;
      const item: ToastItem = {
        id,
        title: opts.title ?? null,
        description: opts.description ?? null,
        variant,
        durationMs,
      };
      setToasts((prev) => [...prev, item]);
      // auto dismiss
      window.setTimeout(() => remove(id), durationMs);
    },
    [remove]
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute z-50 flex flex-col w-full max-w-sm gap-2 transform -translate-x-1/2 top-4 left-1/2">
              <AnimatePresence initial={false}>
                {toasts.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={
                      "pointer-events-auto rounded-xl border p-3 shadow-md bg-white/95 backdrop-blur dark:bg-slate-900/95 " +
                      "border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100"
                    }
                    role="status"
                    aria-live="polite"
                  >
                    {t.title ? (
                      <div className="text-sm font-medium mb-0.5">
                        {t.title}
                      </div>
                    ) : null}
                    {t.description ? (
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        {t.description}
                      </div>
                    ) : null}
                    <div className="w-full h-1 mt-2 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
                      <motion.div
                        className={
                          "h-full " +
                          (t.variant === "success"
                            ? "bg-emerald-500"
                            : t.variant === "error"
                            ? "bg-red-500"
                            : t.variant === "warning"
                            ? "bg-yellow-500"
                            : "bg-slate-500")
                        }
                        initial={{ width: "100%" }}
                        animate={{ width: 0 }}
                        transition={{
                          duration: t.durationMs / 1000,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}
