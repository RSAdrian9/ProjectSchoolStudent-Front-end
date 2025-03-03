// useFormUtils.ts - Métodos reutilizables para formularios
import { reactive } from 'vue';

export function useFormUtils<T extends object>(initialState: T) {
  const form = reactive({ ...initialState });

  // Método para limpiar el formulario
  const clearForm = () => {
    Object.assign(form, initialState);
  };

  return { form, clearForm };
}