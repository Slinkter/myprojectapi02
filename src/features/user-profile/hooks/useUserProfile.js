/**
 * @fileoverview
 * Hook de orquestación para la vista de Perfil de Usuario.
 * Combina el estado de la entidad User y la entidad Post para proporcionar
 * una API unificada a los componentes de la UI.
 *
 * @module useUserProfile
 */

import { useSelector } from 'react-redux';
import { 
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
 * Hook para acceder al estado unificado de un perfil de usuario y sus publicaciones.
 * A diferencia de los hooks de búsqueda, este hook es puramente reactivo:
 * consume la información ya presente en el Store.
 * 
 * @hook
 * @param {number|string} userId - ID del usuario para validar la propiedad de los datos.
 * @returns {Object} Objeto de estado unificado para la UI.
 */
export const useUserProfile = (userId) => {
    const user = useSelector(selectMemoizedCurrentUser);
    const posts = useSelector(selectMemoizedPosts);
    const userStatus = useSelector(selectUserFetchStatus);
    const postStatus = useSelector(selectPostFetchStatus);
    const userError = useSelector(selectUserFetchError);
    const postError = useSelector(selectPostFetchError);

    // --- Logic / Derived State ---
    
    // Si no hay userId o el usuario en el store no coincide con el solicitado,
    // devolvemos estado vacío para evitar mostrar datos de otro usuario.
    if (!userId || (user && user.id !== userId)) {
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
