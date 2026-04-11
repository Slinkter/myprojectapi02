/**
 * @fileoverview Hook de dominio para la orquestación de la búsqueda de usuarios.
 * Encapsula la lógica de negocio para buscar por ID o por nombre, gestionando
 * la sincronización con el estado global de Redux y la caché local.
 *
 * @module useUserSearch
 * @category Hooks
 */

import { useEffect, useCallback, useState } from "react";
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

    const user = useSelector(selectMemoizedCurrentUser);
    const posts = useSelector(selectMemoizedPosts);
    const status = useSelector(selectUserFetchStatus);
    const error = useSelector(selectUserFetchError);

    const [lastSearchQuery, setLastSearchQuery] = useState(initialUserId);

    useEffect(() => {
        const promise = dispatch(fetchUsersList());
        return () => promise.abort();
    }, [dispatch]);

    useEffect(() => {
        if (initialUserId) {
            const promise = dispatch(fetchUserAndPosts(initialUserId));
            setLastSearchQuery(initialUserId);
            return () => promise.abort();
        }
    }, [dispatch, initialUserId]);

    const performSearch = useCallback(
        (input) => {
            if (!input) return;
            dispatch(fetchUserAndPosts(input));
            setLastSearchQuery(input);
        },
        [dispatch],
    );

    const handleRetry = useCallback(() => {
        if (lastSearchQuery) {
            performSearch(lastSearchQuery);
        }
    }, [performSearch, lastSearchQuery]);

    return {
        user,
        posts,
        status,
        error,
        lastSearchQuery,
        performSearch,
        handleRetry,
    };
};
