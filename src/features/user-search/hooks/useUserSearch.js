/**
 * @fileoverview Hook de dominio para la orquestación de la búsqueda de usuarios.
 * Encapsula la lógica de negocio para buscar por ID o por nombre, gestionando
 * la sincronización con el estado global de Redux y la caché local.
 *
 * @module useUserSearch
 * @category Hooks
 */

import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserAndPosts,
    fetchUsersList,
    selectMemoizedCurrentUser,
    selectUserFetchStatus,
    selectUserFetchError,
} from "@/entities/user/store/userSlice";
import { selectMemoizedPosts } from "@/entities/post/store/post.slice";

/**
 * Hook personalizado para gestionar la búsqueda de perfiles de usuario.
 * Proporciona una interfaz unificada para realizar búsquedas inteligentes,
 * manejar reintentos y acceder al estado actual del perfil y sus publicaciones.
 *
 * @hook
 * @param {number|string} initialUserId - Identificador inicial para cargar datos al montar el componente.
 * @returns {Object} Un objeto con el estado y controladores de búsqueda:
 * @returns {Object|null} returns.user - Datos del perfil del usuario encontrado.
 * @returns {Array} returns.posts - Lista de publicaciones del usuario.
 * @returns {string} returns.status - Estado de la petición ('idle', 'loading', 'succeeded', 'failed', 'notFound').
 * @returns {string|null} returns.error - Mensaje de error si la búsqueda falla.
 * @returns {number|string} returns.lastSearchQuery - El último ID o término buscado.
 * @returns {Function} returns.performSearch - Función para iniciar una nueva búsqueda.
 * @returns {Function} returns.handleRetry - Función para reintentar la última búsqueda fallida.
 *
 * @example
 * ```tsx
 * const { user, status, performSearch } = useUserSearch(1);
 *
 * const onSearch = (term) => performSearch(term);
 * ```
 */
export const useUserSearch = (initialUserId) => {
    const dispatch = useDispatch();

    // --- Selectores ---
    // Acceso al estado global mediante selectores memoizados para optimizar renders.
    const user = useSelector(selectMemoizedCurrentUser);
    const posts = useSelector(selectMemoizedPosts);
    const status = useSelector(selectUserFetchStatus);
    const error = useSelector(selectUserFetchError);

    const [lastSearchQuery, setLastSearchQuery] = React.useState(initialUserId);

    /**
     * Efecto de sincronización para cargar la lista de usuarios en caché.
     * Necesaria para la resolución de nombres de usuario en el Thunk.
     */
    useEffect(() => {
        dispatch(fetchUsersList());
    }, [dispatch]);

    /**
     * Sincronización inicial del usuario basada en el parámetro initialUserId.
     */
    useEffect(() => {
        if (initialUserId) {
            dispatch(fetchUserAndPosts(initialUserId));
            setLastSearchQuery(initialUserId);
        }
    }, [dispatch, initialUserId]);

    /**
     * Orquesta la búsqueda de un usuario. Delega la resolución de la identidad
     * (ID vs Nombre) al Thunk de Redux para mantener la lógica fuera del componente.
     *
     * @function performSearch
     * @param {string|number} input - Término de búsqueda (ID o Nombre).
     */
    const performSearch = useCallback(
        (input) => {
            if (!input) return;

            // El Thunk fetchUserAndPosts ahora maneja internamente la resolución vía search-engine.js
            dispatch(fetchUserAndPosts(input));
            setLastSearchQuery(input);
        },
        [dispatch],
    );

    /**
     * Reintenta la búsqueda actual utilizando el último término registrado.
     * @function handleRetry
     */
    const handleRetry = useCallback(() => {
        if (lastSearchQuery) {
            performSearch(lastSearchQuery);
        }
    }, [performSearch, lastSearchQuery]);

    // Memoizamos el objeto de retorno para evitar que los componentes que consumen
    // este hook se re-rendericen a menos que cambie una de las dependencias.
    return useMemo(
        () => ({
            user,
            posts,
            status,
            error,
            lastSearchQuery,
            performSearch,
            handleRetry,
        }),
        [
            user,
            posts,
            status,
            error,
            lastSearchQuery,
            performSearch,
            handleRetry,
        ],
    );
};
