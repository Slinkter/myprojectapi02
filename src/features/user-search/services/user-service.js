/**
 * @fileoverview Application Service para el dominio de Usuarios.
 * Actúa como orquestador entre la capa de infraestructura (API Adapters)
 * y la capa de dominio (Mappers). Sigue el principio de Single Responsibility
 * al centralizar la lógica de negocio para obtener datos de usuario complejos.
 * 
 * @module user-service
 */

import { getUser, getAllUsers } from "../api/user.api";
import { getPostsByUser } from "../api/post.api";
import { mapRawUser, mapRawPosts } from "../domain/user.mappers";

/**
 * Recupera el perfil completo de un usuario, incluyendo sus publicaciones.
 * Coordina múltiples llamadas concurrentes a la API y utiliza mappers para
 * transformar los resultados en entidades seguras para el dominio.
 * 
 * @async
 * @function fetchUserProfileById
 * @param {number|string} userId - El identificador único del usuario.
 * @returns {Promise<{user: Object|null, posts: Array}>} Un objeto que contiene el perfil
 * del usuario mapeado y su lista de publicaciones sanitizada.
 * 
 * @example
 * ```javascript
 * const { user, posts } = await fetchUserProfileById(1);
 * if (user) {
 *   console.log(`Usuario ${user.name} tiene ${posts.length} posts.`);
 * }
 * ```
 */
export const fetchUserProfileById = async (userId) => {
  if (!userId) return { user: null, posts: [] };

  const [rawUser, rawPosts] = await Promise.all([
    getUser(userId),
    getPostsByUser(userId),
  ]);

  // Si el usuario no existe o la API retornó un objeto vacío, aplicamos Early Return.
  if (!rawUser || Object.keys(rawUser).length === 0) {
    return { user: null, posts: [] };
  }

  const user = mapRawUser(rawUser);
  const posts = mapRawPosts(rawPosts);

  return { user, posts };
};

/**
 * Obtiene y sanitiza la lista de todos los usuarios registrados.
 * Aplica validaciones de integridad después del mapeo para asegurar que
 * solo los perfiles válidos lleguen a la UI.
 * 
 * @async
 * @function fetchAllUsers
 * @returns {Promise<Array<Object>>} Una promesa que resuelve con la lista completa de
 * usuarios del dominio.
 * 
 * @example
 * ```javascript
 * const users = await fetchAllUsers();
 * const activeUsers = users.filter(u => u.id > 0);
 * ```
 */
export const fetchAllUsers = async () => {
  const rawUsers = await getAllUsers();
  
  if (!Array.isArray(rawUsers)) return [];

  return rawUsers
    .map(mapRawUser)
    .filter(user => user && user.id); // Asegura integridad filtrando perfiles rotos.
};
