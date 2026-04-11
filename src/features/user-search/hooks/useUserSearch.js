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
    selectMemoizedCurrentUser,
    selectUserFetchStatus,
    selectUserFetchError,
} from "@/entities/user/store/userSlice";
import { fetchUserAndPosts, fetchUsersList } from "@/entities/user/store/user.thunks";
import { selectMemoizedPosts } from "@/entities/post/store/post.slice";

/**
 * Hook personalizado para gestionar la búsqueda de perfiles de usuario.
 * Proporciona una interfaz unificada para realizar búsquedas inteligentes,
 * manejar reintentos y acceder al estado actual del perfil y sus publicaciones.
 *
 * @hook
 * @param {number|string} initialUserId - Identificador inicial para cargar datos al montar el componente.
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
            // Carga silenciosa para el ID inicial: no bloqueamos la UI con errores si falla
            dispatch(fetchUserAndPosts(initialUserId)).catch(() => {
                console.info("Silent load: Initial user data failed to fetch.");
            });
            setLastSearchQuery(initialUserId);
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
