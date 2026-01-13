import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndPosts } from "../redux/userSlice";

/**
 * Custom Hook para gestionar la lógica de búsqueda y visualización de usuarios.
 *
 * Este hook encapsula toda la lógica relacionada con la búsqueda de usuarios,
 * incluyendo la gestión del estado local (input), la interacción con Redux,
 * y la validación de entrada. Actúa como intermediario entre los componentes
 * de UI y el store de Redux.
 *
 * @hook
 * @category User Search
 *
 * @param {number|string} initialUserId - ID del usuario a cargar inicialmente.
 *                                        Debe ser un número entre 1 y 10.
 *
 * @returns {Object} Objeto con el estado y funciones para interactuar con la búsqueda de usuarios.
 * @returns {Object|null} returns.user - Datos del usuario actual o null si no hay usuario.
 * @returns {Object} returns.user.id - ID del usuario.
 * @returns {string} returns.user.name - Nombre completo del usuario.
 * @returns {string} returns.user.username - Nombre de usuario.
 * @returns {string} returns.user.email - Email del usuario.
 * @returns {string} returns.user.website - Sitio web del usuario.
 * @returns {Object} returns.user.company - Información de la empresa.
 * @returns {Object} returns.user.address - Información de dirección.
 *
 * @returns {Array<Object>} returns.posts - Array de publicaciones del usuario.
 * @returns {number} returns.posts[].id - ID de la publicación.
 * @returns {string} returns.posts[].title - Título de la publicación.
 * @returns {string} returns.posts[].body - Contenido de la publicación.
 *
 * @returns {('idle'|'loading'|'succeeded'|'failed'|'notFound')} returns.status - Estado actual de la búsqueda.
 *          - 'idle': Estado inicial, sin búsqueda realizada.
 *          - 'loading': Búsqueda en progreso.
 *          - 'succeeded': Búsqueda exitosa, datos disponibles.
 *          - 'failed': Error en la búsqueda (red, servidor).
 *          - 'notFound': Usuario no encontrado (404 o respuesta vacía).
 *
 * @returns {string|null} returns.error - Mensaje de error o null si no hay error.
 * @returns {number|null} returns.searchId - ID del último usuario buscado o null.
 * @returns {string} returns.inputValue - Valor actual del campo de entrada.
 *
 * @returns {Function} returns.handleInputChange - Handler para cambios en el input.
 * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio del input.
 *
 * @returns {Function} returns.handleSearch - Handler para ejecutar la búsqueda.
 *                                           Valida y despacha la acción de búsqueda.
 *
 * @returns {Function} returns.handleRetry - Handler para reintentar la última búsqueda.
 *                                          Útil cuando hay errores de red.
 *
 * @example
 * // Uso básico en un componente
 * function UserSearchPage() {
 *   const {
 *     user,
 *     posts,
 *     status,
 *     error,
 *     inputValue,
 *     handleInputChange,
 *     handleSearch,
 *     handleRetry
 *   } = useUser(1);
 *
 *   return (
 *     <div>
 *       <input value={inputValue} onChange={handleInputChange} />
 *       <button onClick={handleSearch}>Buscar</button>
 *       {status === 'loading' && <Skeleton />}
 *       {status === 'succeeded' && <UserProfile user={user} />}
 *       {status === 'failed' && <ErrorMessage onRetry={handleRetry} />}
 *     </div>
 *   );
 * }
 *
 * @example
 * // Renderizado condicional basado en status
 * const { status, user, posts } = useUser(5);
 *
 * switch(status) {
 *   case 'loading':
 *     return <LoadingSpinner />;
 *   case 'succeeded':
 *     return <UserData user={user} posts={posts} />;
 *   case 'failed':
 *     return <ErrorMessage />;
 *   case 'notFound':
 *     return <NotFoundCard />;
 *   default:
 *     return null;
 * }
 *
 * @see {@link fetchUserAndPosts} - AsyncThunk de Redux que ejecuta la búsqueda.
 * @see {@link UserSearchPage} - Componente que utiliza este hook.
 *
 * @since 1.0.0
 * @version 1.0.0
 */
export const useUser = (initialUserId) => {
  //
  const { user, posts, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //
  const [inputValue, setInputValue] = useState(initialUserId.toString());
  const [searchId, setSearchId] = useState(null);

  // `useEffect` para ejecutar la búsqueda inicial cuando el componente se monta.
  useEffect(() => {
    if (initialUserId) {
      dispatch(fetchUserAndPosts(initialUserId));
      setSearchId(initialUserId);
    }
  }, [dispatch, initialUserId]);

  /**
   * Maneja los cambios en el campo de entrada del ID de usuario.
   * Valida que el valor sea un número entre 1 y 10 o vacío.
   *
   * @function handleInputChange
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input.
   * @returns {void}
   *
   * @example
   * <input
   *   type="number"
   *   value={inputValue}
   *   onChange={handleInputChange}
   * />
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Regex: Solo permite vacío o números del 1 al 10
    if (/^$|^[1-9]$|^10$/.test(value)) {
      setInputValue(value);
    }
  };

  /**
   * Ejecuta la búsqueda del usuario con el ID ingresado.
   * Valida que haya un valor, lo convierte a número y despacha
   * la acción asíncrona de Redux para obtener los datos.
   *
   * @function handleSearch
   * @returns {void}
   *
   * @example
   * <button onClick={handleSearch} disabled={!inputValue}>
   *   Buscar
   * </button>
   */
  const handleSearch = useCallback(() => {
    if (inputValue) {
      const userId = Number(inputValue);
      dispatch(fetchUserAndPosts(userId));
      setSearchId(userId);
    }
  }, [dispatch, inputValue]);

  /**
   * Reintenta la última búsqueda realizada.
   * Útil cuando ocurre un error de red y el usuario quiere
   * intentar nuevamente sin cambiar el ID.
   *
   * @function handleRetry
   * @returns {void}
   *
   * @example
   * {status === 'failed' && (
   *   <button onClick={handleRetry}>
   *     Reintentar
   *   </button>
   * )}
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
    inputValue,
    handleInputChange,
    handleSearch,
    handleRetry,
  };
};
