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
import { fetchUserAndPosts, fetchUsersList } from "../redux/userSlice";
import { 
  selectCurrentUserProfile, 
  selectCurrentUserPosts, 
  selectUserFetchStatus, 
  selectUserFetchError, 
  selectCachedUsers 
} from "../redux/userSlice";

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
 * @returns {number|string} returns.searchId - El último ID o término buscado.
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
  
  // Selectores estandarizados para acceso al estado global.
  const user = useSelector(selectCurrentUserProfile);
  const posts = useSelector(selectCurrentUserPosts);
  const status = useSelector(selectUserFetchStatus);
  const error = useSelector(selectUserFetchError);
  const cachedUsers = useSelector(selectCachedUsers);

  const [searchId, setSearchId] = useState(initialUserId);

  /**
   * Efecto de sincronización para cargar la lista de usuarios en caché.
   * Necesaria para la búsqueda local por nombre/username.
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
      setSearchId(initialUserId);
    }
  }, [dispatch, initialUserId]);

  /**
   * Orquesta la lógica de búsqueda inteligente.
   * - Si el input es puramente numérico, busca directamente por ID en la API.
   * - Si es texto, busca coincidencia parcial en la lista de usuarios en caché.
   * 
   * @function performSearch
   * @param {string|number} input - Término de búsqueda (ID o Nombre).
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
        // Fallback: Si no se encuentra en caché, forzamos un estado 404.
        dispatch({ 
          type: "user/fetchById/rejected", 
          payload: { status: 404, message: "user.notFoundTitle" } 
        });
        setSearchId(input);
      }
    }
  }, [dispatch, cachedUsers]);

  /**
   * Reintenta la búsqueda actual utilizando el último identificador registrado.
   * @function handleRetry
   */
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
