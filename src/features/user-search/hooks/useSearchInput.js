import { useState } from "react";

/**
 * Hook para gestionar el estado del campo de entrada (input) de búsqueda.
 * Encapsula la validación y el formateo del ID del usuario.
 * 
 * @category Hooks
 * @returns {Object} 
 * @property {string} inputValue - Valor actual del input.
 * @property {function} handleInputChange - Manejador de cambios con validación regex.
 * @property {function} setInputValue - Función para resetear o cambiar el valor manualmente.
 */
export const useSearchInput = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue.toString());

  /**
   * Maneja los cambios en el input validando que sea un número del 1 al 10.
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Regex: Solo permite vacío o números del 1 al 10
    if (/^$|^[1-9]$|^10$/.test(value)) {
      setInputValue(value);
    }
  };

  return {
    inputValue,
    handleInputChange,
    setInputValue
  };
};
