/**
 * @fileoverview Hook de UI para la gestión del input de búsqueda.
 * Proporciona lógica de validación en tiempo real y mensajes de asistencia (helper text)
 * desacoplados de la lógica de dominio o de persistencia.
 *
 * @module useSearchInput
 * @category Hooks
 */

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { SEARCH_LIMITS, UX_CONFIG } from "@/shared/config/constants";

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
 */
export const useSearchInput = (initialSearch = "") => {
    const [searchValue, setSearchValue] = useState(initialSearch.toString());
    const [helperMessage, setHelperMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const debounceRef = useRef(null);

    /**
     * Ejecuta la lógica de validación y retorna el estado del input.
     * @param {string} value - Valor a validar.
     * @returns {{message: string, error: boolean}} Resultado de la validación.
     */
    const validate = useCallback((value) => {
        if (!value) return { message: "", error: false };

        // Validación de ID Numérico (Rango Dinámico)
        if (/^\d+$/.test(value)) {
            const numericId = parseInt(value, 10);

            if (numericId < SEARCH_LIMITS.MIN_ID || numericId > SEARCH_LIMITS.MAX_ID) {
                return {
                    message: `La API solo soporta IDs del ${SEARCH_LIMITS.MIN_ID} al ${SEARCH_LIMITS.MAX_ID}.`,
                    error: true,
                };
            }

            return { message: "Buscando por ID numérico.", error: false };
        }

        // Feedback para búsqueda por Texto (Nombre/Username)
        return { message: "Buscando por nombre o usuario.", error: false };
    }, []);

    /**
     * Maneja los cambios en el input de búsqueda.
     * Actualiza el valor de forma inmediata para mantener la UI reactiva y 
     * dispara la validación debounced para evitar re-renders excesivos.
     *
     * @function onInputChange
     * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio nativo.
     */
    const onInputChange = useCallback((event) => {
        const value = event.target.value;
        setSearchValue(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            const { message, error } = validate(value);
            setHelperMessage(message);
            setHasError(error);
        }, UX_CONFIG.DEBOUNCE_DELAY);
    }, [validate]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    return useMemo(() => ({
        searchValue,
        helperMessage,
        hasError,
        onInputChange,
        setSearchValue,
    }), [searchValue, helperMessage, hasError, onInputChange, setSearchValue]);

};
