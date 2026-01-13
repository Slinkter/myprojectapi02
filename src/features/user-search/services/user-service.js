import { getUser } from "../api/user.api";
import { getPostsByUser } from "../api/post.api";

/**
 * @fileoverview Servicio de dominio para la gestión de perfiles de usuario.
 * Este módulo orquesta las llamadas a múltiples APIs y aplica lógica de negocio
 * para construir el perfil completo de un usuario.
 *
 * @module user-service
 * @category Services
 * @since 1.0.0
 */

/**
 * Obtiene el perfil completo de un usuario, incluyendo sus datos personales
 * y todas sus publicaciones.
 *
 * Esta función orquesta las llamadas a la API para obtener el perfil completo
 * de un usuario. Ejecuta las peticiones en paralelo usando `Promise.all` para
 * optimizar el tiempo de respuesta. También valida si el usuario existe,
 * retornando `null` si la API devuelve un objeto vacío.
 *
 * @async
 * @function fetchUserProfile
 * @category Business Logic
 *
 * @param {number|string} userId - El ID del usuario a buscar. Debe ser un número
 *                                 entre 1 y 10 (limitación de JSONPlaceholder API).
 *
 * @returns {Promise<Object>} Promesa que resuelve con el perfil completo del usuario.
 * @returns {Object|null} returns.user - Datos del usuario o null si no existe.
 * @returns {number} returns.user.id - ID único del usuario.
 * @returns {string} returns.user.name - Nombre completo del usuario.
 * @returns {string} returns.user.username - Nombre de usuario único.
 * @returns {string} returns.user.email - Dirección de correo electrónico.
 * @returns {Object} returns.user.address - Información de dirección completa.
 * @returns {Object} returns.user.company - Información de la empresa.
 *
 * @returns {Array<Object>} returns.posts - Array de publicaciones del usuario.
 * @returns {number} returns.posts[].id - ID único de la publicación.
 * @returns {string} returns.posts[].title - Título de la publicación.
 * @returns {string} returns.posts[].body - Contenido completo de la publicación.
 *
 * @throws {Error} Si hay un error de red o el servidor no responde.
 *
 * @example
 * // Uso básico
 * const profile = await fetchUserProfile(1);
 * console.log(profile.user.name); // "Leanne Graham"
 *
 * @example
 * // Manejo de usuario no encontrado
 * const profile = await fetchUserProfile(999);
 * if (profile.user === null) {
 *   console.log("Usuario no encontrado");
 * }
 *
 * @see {@link getUser} - Función que obtiene los datos del usuario.
 * @see {@link getPostsByUser} - Función que obtiene las publicaciones.
 *
 * @since 1.0.0
 */
export const fetchUserProfile = async (userId) => {
  // Se ejecutan ambas promesas en paralelo para mayor eficiencia.
  const [user, posts] = await Promise.all([
    getUser(userId),
    getPostsByUser(userId),
  ]);

  // La API de JSONPlaceholder devuelve {} si no encuentra el usuario.
  // Esta comprobación explícita hace que el servicio sea más robusto.
  if (user && Object.keys(user).length === 0) {
    return { user: null, posts: [] };
  }

  return { user, posts };
};
