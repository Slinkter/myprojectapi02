import { useState, useCallback } from "react";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Hook de UI para gestionar el input de búsqueda.
 * Sigue Clean Code: Nombres descriptivos y lógica desacoplada.
 * 
 * @param {string} initialSearch - Valor inicial de búsqueda.
 * @returns {Object} Estado y manejadores de búsqueda.
 */
export const useSearchInput = (initialSearch = "") => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(initialSearch.toString());
  const [helperMessage, setHelperMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  /**
   * Valida y procesa el cambio en el input.
   * Aplica Early Return para una lógica lineal.
   */
  const onInputChange = useCallback((event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Caso: Input vacío
    if (!value) {
      setHelperMessage("");
      setHasError(false);
      return;
    }

    // Caso: ID Numérico
    if (/^\d+$/.test(value)) {
      const numericId = parseInt(value, 10);
      
      if (numericId > 10) {
        setHelperMessage(t("search.helper.limit"));
        setHasError(true);
        return;
      }

      setHelperMessage(t("search.helper.idOk"));
      setHasError(false);
      return;
    }

    // Caso: Búsqueda por Texto
    setHelperMessage(t("search.helper.nameOk"));
    setHasError(false);
  }, [t]);

  return {
    searchValue,
    helperMessage,
    hasError,
    onInputChange,
    setSearchValue
  };
};
