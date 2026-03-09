/**
 * @fileoverview Hook de UI para la gestión del input de búsqueda.
 * Proporciona lógica de validación en tiempo real y mensajes de asistencia (helper text)
 * desacoplados de la lógica de dominio o de persistencia.
 * 
 * @module useSearchInput
 * @category Hooks
 */

import { useState, useCallback } from "react";

/**
 * Hook para controlar el estado y validación del campo de búsqueda.
 * Implementa reglas de negocio para la entrada de datos: limita IDs numéricos
 * y proporciona feedback visual instantáneo.
 * 
 * @hook
 * @param {string|number} initialSearch - Valor inicial para el campo de búsqueda.
 * @returns {Object} Un objeto con el estado del input y sus manejadores:
 * @returns {string} returns.searchValue - El valor actual del input.
 * @returns {string} returns.helperMessage - Mensaje de ayuda basado en la validación actual.
 * @returns {boolean} returns.hasError - `true` si la validación actual ha fallado.
 * @returns {Function} returns.onInputChange - Manejador de evento para cambios en el input.
 * @returns {Function} returns.setSearchValue - Función para actualizar el valor manualmente.
 * 
 * @example
 * ```tsx
 * const { searchValue, onInputChange, helperMessage } = useSearchInput("");
 * 
 * return <input value={searchValue} onChange={onInputChange} />;
 * ```
 */
export const useSearchInput = (initialSearch = "") => {
  const [searchValue, setSearchValue] = useState(initialSearch.toString());
  const [helperMessage, setHelperMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  /**
   * Valida y procesa los cambios en el input de búsqueda.
   * - Si el input es un ID numérico, valida que esté dentro del rango permitido (1-10).
   * - Si es texto, informa que se buscará por nombre.
   * - Aplica Early Return para simplificar las ramas de decisión.
   * 
   * @function onInputChange
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio nativo.
   * @returns {void}
   */
  const onInputChange = useCallback((event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Early Return: Caso de input vacío.
    if (!value) {
      setHelperMessage("");
      setHasError(false);
      return;
    }

    // Validación de ID Numérico (Rango [1, 10]).
    if (/^\d+$/.test(value)) {
      const numericId = parseInt(value, 10);
      
      // La API externa JSONPlaceholder solo tiene 10 usuarios estables (IDs 1-10).
      if (numericId < 1 || numericId > 10) {
        setHelperMessage("La API solo soporta IDs del 1 al 10.");
        setHasError(true);
        return;
      }

      setHelperMessage("Buscando por ID numérico.");
      setHasError(false);
      return;
    }

    // Feedback para búsqueda por Texto (Nombre/Username).
    setHelperMessage("Buscando por nombre o usuario.");
    setHasError(false);
  }, []);

  return {
    searchValue,
    helperMessage,
    hasError,
    onInputChange,
    setSearchValue
  };
};
