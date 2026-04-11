/**
 * @fileoverview
 * Hook para la gestión del perfil de usuario y sus publicaciones.
 * Proporciona un estado unificado y derivado para simplificar el consumo en componentes.
 *
 * @module useUserProfile
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCurrentUser,
    selectUserFetchStatus,
    selectUserFetchError,
} from "@/entities/user/store/userSlice";
import { fetchUserAndPosts } from "@/entities/user/store/user.thunks";
import {
    selectMemoizedPosts,
    selectPostFetchStatus,
    selectPostFetchError,
} from "@/entities/post/store/post.slice";

/**
 * Hook para obtener y gestionar los datos de un perfil de usuario.
 * @param {number|string} userId - ID del usuario a recuperar.
 */
export const useUserProfile = (userId) => {
    const dispatch = useDispatch();

    // Selectores de Usuario
    const user = useSelector(selectCurrentUser);
    const userStatus = useSelector(selectUserFetchStatus);
    const userError = useSelector(selectUserFetchError);

    // Selectores de Posts
    const posts = useSelector(selectMemoizedPosts);
    const postStatus = useSelector(selectPostFetchStatus);
    const postError = useSelector(selectPostFetchError);

    useEffect(() => {
        if (userId) {
            const promise = dispatch(fetchUserAndPosts(userId));
            return () => promise.abort();
        }
    }, [dispatch, userId]);

    // Lógica derivada para la UI
    const isLoading = userStatus === "loading" || postStatus === "loading";
    const error = userError || postError;
    const isNotFound = userStatus === "notFound";

    return {
        user,
        posts,
        isLoading,
        error,
        isNotFound,
    };
};
