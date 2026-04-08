/**
 * @fileoverview Hook de UI para la gestión del input de búsqueda.
 * Proporciona lógica de validación en tiempo real y mensajes de asistencia (helper text)
 * desacoplados de la lógica de dominio o de persistencia.
 *
 * @module useSearchInput
 * @category Hooks
 */

import { useState, useCallback, useEffect, useRef } from "react";
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
 *
 * @example
 * ```tsx
 * const { searchValue, onInputChange, helperMessage } = useSearchInput("");
 *
 * return <input value={searchValue} onChange={onInputChange} />;
 * ```
 */
export const useSearchInput = (initialSearch = 1) => {
    const [searchValue, setSearchValue] = useState(initialSearch.toString());
    const [helperMessage, setHelperMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const debounceRef = useRef(null);

    /**
     * Ejecuta la lógica de validación y genera mensajes de ayuda.
     * Se separa del input directo para permitir debouncing.
     */
    const validateInput = useCallback((value) => {
        // Early Return: Caso de input vacío.
        if (!value) {
            setHelperMessage("");
            setHasError(false);
            return;
        }

        // Validación de ID Numérico (Rango Dinámico).
        if (/^\d+$/.test(value)) {
            const numericId = parseInt(value, 10);

            // La API externa JSONPlaceholder solo tiene un conjunto limitado de usuarios estables.
            if (
                numericId < SEARCH_LIMITS.MIN_ID ||
                numericId > SEARCH_LIMITS.MAX_ID
            ) {
                setHelperMessage(
                    `La API solo soporta IDs del ${SEARCH_LIMITS.MIN_ID} al ${SEARCH_LIMITS.MAX_ID}.`,
                );
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

    /**
     * Efecto para manejar el debouncing de la validación.
     * Mejora el rendimiento al no re-validar en cada pulsación de tecla.
     */
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            validateInput(searchValue);
        }, UX_CONFIG.DEBOUNCE_DELAY);

        return () => clearTimeout(debounceRef.current);
    }, [searchValue, validateInput]);

    /**
     * Maneja los cambios en el input de búsqueda.
     * Actualiza el valor de forma inmediata para mantener la UI reactiva.
     *
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
