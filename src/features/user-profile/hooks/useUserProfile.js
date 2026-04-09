/**
 * @fileoverview
 * Hook de orquestación para la vista de Perfil de Usuario.
 * Combina el estado de la entidad User y la entidad Post para proporcionar
 * una API unificada a los componentes de la UI.
 *
 * @module useUserProfile
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchUserAndPosts, 
    selectMemoizedCurrentUser, 
    selectUserFetchStatus, 
    selectUserFetchError 
} from '@/entities/user/store/userSlice';
import { 
    selectMemoizedPosts, 
    selectPostFetchStatus, 
    selectPostFetchError 
} from '@/entities/post/store/post.slice';

/**
 * Hook para gestionar la carga y sincronización de un perfil de usuario y sus publicaciones.
 * 
 * @function useUserProfile
 * @param {number|string} userId - ID del usuario cuyo perfil se desea cargar.
 * @returns {Object} Objeto de estado unificado para la UI.
 * @property {Object|null} user - Datos del usuario mapeados al dominio.
 * @property {Array<Object>} posts - Lista de publicaciones del usuario.
 * @property {boolean} isLoading - Indica si cualquiera de las peticiones está en curso.
 * @property {string|null} error - Mensaje de error unificado.
 * @property {boolean} isNotFound - Indica si el usuario no fue encontrado (404).
 */
export const useUserProfile = (userId) => {
    const dispatch = useDispatch();

    // --- Selectors ---
    const user = useSelector(selectMemoizedCurrentUser);
    const posts = useSelector(selectMemoizedPosts);
    const userStatus = useSelector(selectUserFetchStatus);
    const postStatus = useSelector(selectPostFetchStatus);
    const userError = useSelector(selectUserFetchError);
    const postError = useSelector(selectPostFetchError);

    useEffect(() => {
        if (!userId) return;

        const controller = new AbortController();
        
        // Despachamos la acción que orquestará la carga en ambos slices
        dispatch(fetchUserAndPosts(userId));

        return () => controller.abort();
    }, [userId, dispatch]);

    // --- Logic / Derived State ---

    // Early Return: Si no hay userId, devolvemos estado vacío
    if (!userId) {
        return {
            user: null,
            posts: [],
            isLoading: false,
            error: null,
            isNotFound: false,
        };
    }

    const isLoading = userStatus === 'loading' || postStatus === 'loading';
    const isNotFound = userStatus === 'notFound';
    const error = userError || postError;

    return {
        user,
        posts,
        isLoading,
        error,
        isNotFound,
    };
};
