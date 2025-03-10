import { inject, type InjectionKey } from 'vue'

export interface ToastFunction {
  (message: string, type: 'success' | 'error'): void
}

export const ToastSymbol: InjectionKey<ToastFunction> = Symbol('Toast')

export function useToast() {
  return {
    toast: inject(ToastSymbol)!
  }
}
