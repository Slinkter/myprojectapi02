import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndPosts, fetchUsersList } from "../redux/userSlice";

/**
 * Hook de dominio para búsqueda inteligente.
 */
export const useUserSearch = (initialUserId) => {
  const dispatch = useDispatch();
  const { user, posts, status, error, allUsers } = useSelector((state) => state.user);
  const [searchId, setSearchId] = useState(initialUserId);

  // Cargar lista de usuarios al inicio para búsqueda por nombre
  useEffect(() => {
    dispatch(fetchUsersList());
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
      // Búsqueda por ID
      const userId = Number(input);
      dispatch(fetchUserAndPosts(userId));
      setSearchId(userId);
    } else {
      // Búsqueda por Nombre/Username en la lista cacheada
      const found = allUsers.find(u => 
        u.name.toLowerCase().includes(input.toLowerCase()) || 
        u.username.toLowerCase().includes(input.toLowerCase())
      );

      if (found) {
        dispatch(fetchUserAndPosts(found.id));
        setSearchId(found.id);
      } else {
        // Forzamos estado notFound si no hay coincidencias de texto
        dispatch({ type: "user/fetchById/rejected", payload: { status: 404, message: "No match" } });
        setSearchId(input);
      }
    }
  }, [dispatch, allUsers]);

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
