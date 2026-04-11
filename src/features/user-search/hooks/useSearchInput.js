/**
 * @fileoverview Hook de UI para la gestión del input de búsqueda.
 * Proporciona lógica de validación en tiempo real y mensajes de asistencia (helper text)
 * desacoplados de la lógica de dominio o de persistencia.
 *
 * @module useSearchInput
 * @category Hooks
 */

import { useState, useCallback, useMemo } from "react";
import { SEARCH_LIMITS } from "@/shared/config/constants";

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
 * @returns {boolean} returns.hasError - \`true\` si la validación actual ha fallado.
 * @returns {Function} returns.onInputChange - Manejador de evento para cambios en el input.
 * @returns {Function} returns.setSearchValue - Función para actualizar el valor manualmente.
 */
export const useSearchInput = (initialSearch = "") => {
    const [searchValue, setSearchValue] = useState(initialSearch.toString());

    /**
     * Ejecuta la lógica de validación y retorna el estado del input.
     * Se computa durante el render para evitar efectos innecesarios.
     * 
     * @param {string} value - Valor a validar.
     * @returns {{helperMessage: string, hasError: boolean}} Resultado de la validación.
     */
    const validate = useCallback((value) => {
        if (!value) return { helperMessage: "", hasError: false };

        // Validación de ID Numérico (Rango Dinámico)
        if (/^\d+$/.test(value)) {
            const numericId = parseInt(value, 10);

            if (numericId < SEARCH_LIMITS.MIN_ID || numericId > SEARCH_LIMITS.MAX_ID) {
                return {
                    helperMessage: `La API solo soporta IDs del ${SEARCH_LIMITS.MIN_ID} al ${SEARCH_LIMITS.MAX_ID}.`,
                    hasError: true,
                };
            }

            return { helperMessage: "Buscando por ID numérico.", hasError: false };
        }

        // Feedback para búsqueda por Texto (Nombre/Username)
        return { helperMessage: "Buscando por nombre o usuario.", hasError: false };
    }, []);

    // Derivación de estado durante el render:
    // Evitamos usar useState + useEffect para la validación ya que es una operación síncrona y barata.
    const { helperMessage, hasError } = useMemo(() => validate(searchValue), [searchValue, validate]);

    /**
     * Maneja los cambios en el input de búsqueda.
     * @function onInputChange
     * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio nativo.
     */
    const onInputChange = useCallback((event) => {
        setSearchValue(event.target.value);
    }, []);

    return {
        searchValue,
        helperMessage,
        hasError,
        onInputChange,
        setSearchValue,
    };
};
