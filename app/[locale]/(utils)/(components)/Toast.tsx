"use client"

import { create } from 'zustand'
import { motion, AnimatePresence } from 'framer-motion'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

let nextId = 0

interface ToastStore {
  toasts: Toast[]
  addToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: number) => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (message, type = 'info') => {
    const id = nextId++
    set({ toasts: [...get().toasts, { id, message, type }] })
    setTimeout(() => {
      set({ toasts: get().toasts.filter(t => t.id !== id) })
    }, 4000)
  },
  removeToast: (id) => {
    set({ toasts: get().toasts.filter(t => t.id !== id) })
  }
}))

export function useToast() {
  return useToastStore(s => s.addToast)
}

const containerClasses: Record<Toast['type'], string> = {
  success: 'border-green-500/50 bg-green-500/20',
  error:   'border-red-500/50 bg-red-500/20',
  info:    'border-miquel-blue-400/50 bg-miquel-blue-400/20',
}

export function ToastContainer() {
  const toasts = useToastStore(s => s.toasts)
  const removeToast = useToastStore(s => s.removeToast)

  return (
    <div className="fixed bottom-6 right-10 z-app-overlay flex flex-col-reverse gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`px-4 py-3 rounded-lg border backdrop-blur-md text-sm text-miquel-white-200 max-w-md pointer-events-auto cursor-pointer ${containerClasses[toast.type]}`}
            onClick={() => removeToast(toast.id)}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
