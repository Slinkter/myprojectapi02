import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndPosts } from "../redux/userSlice";

/**
 * Hook de dominio para gestionar la búsqueda de usuarios y sus posts.
 * Se comunica directamente con el store de Redux.
 * 
 * @category Hooks
 * @param {number|string} initialUserId - ID inicial para cargar al montar.
 * @returns {Object} Estado de Redux y funciones de acción.
 */
export const useUserSearch = (initialUserId) => {
  const dispatch = useDispatch();
  const { user, posts, status, error } = useSelector((state) => state.user);
  const [searchId, setSearchId] = useState(initialUserId);

  // Carga inicial
  useEffect(() => {
    if (initialUserId) {
      dispatch(fetchUserAndPosts(initialUserId));
      setSearchId(initialUserId);
    }
  }, [dispatch, initialUserId]);

  /**
   * Ejecuta la búsqueda de un usuario por ID.
   * @param {number|string} id 
   */
  const performSearch = useCallback((id) => {
    if (id) {
      const userId = Number(id);
      dispatch(fetchUserAndPosts(userId));
      setSearchId(userId);
    }
  }, [dispatch]);

  /**
   * Reintenta la última búsqueda exitosa o fallida.
   */
  const handleRetry = useCallback(() => {
    if (searchId) {
      dispatch(fetchUserAndPosts(searchId));
    }
  }, [dispatch, searchId]);

  return {
    user,
    posts,
    status,
    error,
    searchId,
    performSearch,
    handleRetry,
  };
};
