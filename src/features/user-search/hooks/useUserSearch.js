import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndPosts, fetchUsersList } from "../redux/userSlice";
import { 
  selectCurrentUserProfile, 
  selectCurrentUserPosts, 
  selectUserFetchStatus, 
  selectUserFetchError, 
  selectCachedUsers 
} from "../redux/userSlice";

/**
 * Hook de dominio para búsqueda inteligente.
 * Sigue Clean Code: Usa selectores memorizados para aislamiento del estado.
 * 
 * @param {number|string} initialUserId - ID inicial para cargar datos.
 * @returns {Object} Estado de búsqueda y funciones de control.
 */
export const useUserSearch = (initialUserId) => {
  const dispatch = useDispatch();
  
  // Selectores estandarizados
  const user = useSelector(selectCurrentUserProfile);
  const posts = useSelector(selectCurrentUserPosts);
  const status = useSelector(selectUserFetchStatus);
  const error = useSelector(selectUserFetchError);
  const cachedUsers = useSelector(selectCachedUsers);

  const [searchId, setSearchId] = useState(initialUserId);

  /**
   * Sincronización con el sistema externo (Cargar lista de caché).
   */
  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  /**
   * Sincronización inicial del usuario.
   */
  useEffect(() => {
    if (initialUserId) {
      dispatch(fetchUserAndPosts(initialUserId));
      setSearchId(initialUserId);
    }
  }, [dispatch, initialUserId]);

  /**
   * Orquesta la búsqueda: por ID si es número, por Nombre si es texto.
   */
  const performSearch = useCallback((input) => {
    if (!input) return;

    if (/^\d+$/.test(input)) {
      const userId = Number(input);
      dispatch(fetchUserAndPosts(userId));
      setSearchId(userId);
    } else {
      const found = cachedUsers.find(u => 
        u.name.toLowerCase().includes(input.toLowerCase()) || 
        u.username.toLowerCase().includes(input.toLowerCase())
      );

      if (found) {
        dispatch(fetchUserAndPosts(found.id));
        setSearchId(found.id);
      } else {
        dispatch({ 
          type: "user/fetchById/rejected", 
          payload: { status: 404, message: "user.notFoundTitle" } 
        });
        setSearchId(input);
      }
    }
  }, [dispatch, cachedUsers]);

  const handleRetry = useCallback(() => {
    if (searchId) performSearch(searchId);
  }, [performSearch, searchId]);

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
