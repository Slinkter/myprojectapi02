import { useState } from "react";

/**
 * Hook de UI para gestionar el input de búsqueda.
 * Soporta IDs (números) y Nombres (texto).
 * 
 * @category Hooks
 */
export const useSearchInput = (initialValue = "") => {
  const [inputValue, setInputValue] = useState(initialValue.toString());
  const [helperText, setHelperText] = useState("");
  const [isError, setIsError] = useState(false);

  /**
   * Maneja el cambio del input con validación en tiempo real.
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Validación para IDs numéricos (JSONPlaceholder solo tiene IDs del 1 al 10)
    if (/^\d+$/.test(value)) {
      const numId = parseInt(value);
      if (numId > 10) {
        setHelperText("La API solo soporta IDs del 1 al 10.");
        setIsError(true);
      } else {
        setHelperText("Buscando por ID numérico.");
        setIsError(false);
      }
    } else if (value.length > 0) {
      setHelperText("Buscando por nombre o usuario.");
      setIsError(false);
    } else {
      setHelperText("");
      setIsError(false);
    }
  };

  return {
    inputValue,
    helperText,
    isError,
    handleInputChange,
    setInputValue
  };
};
