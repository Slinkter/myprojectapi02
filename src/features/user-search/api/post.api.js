import { fetchFromApi } from "@/lib/api.config";

/**
 * @fileoverview Cliente API para operaciones relacionadas con publicaciones.
 * Proporciona funciones para interactuar con los endpoints de posts
 * de la API JSONPlaceholder.
 *
 * @module post-api
 * @category API Clients
 * @since 1.0.0
 */

/**
 * Obtiene todas las publicaciones de un usuario específico.
 *
 * Realiza una petición GET al endpoint `/posts?userId=:id` de JSONPlaceholder API.
 * Retorna un array con todas las publicaciones del usuario ordenadas por ID.
 *
 * @async
 * @function getPostsByUser
 * @category Data Access
 *
 * @param {number|string} userId - El ID del usuario cuyas publicaciones se desean obtener.
 *
 * @returns {Promise<Array<Object>>} Promesa que resuelve con un array de publicaciones.
 * @returns {number} returns[].id - ID único de la publicación.
 * @returns {number} returns[].userId - ID del usuario autor.
 * @returns {string} returns[].title - Título de la publicación.
 * @returns {string} returns[].body - Contenido completo de la publicación.
 *
 * @throws {Error} Si la petición HTTP falla.
 *
 * @example
 * // Obtener todas las publicaciones del usuario 1
 * const posts = await getPostsByUser(1);
 * console.log(posts.length); // 10
 * console.log(posts[0].title); // Título del primer post
 *
 * @example
 * // Uso con manejo de errores
 * try {
 *   const posts = await getPostsByUser(5);
 *   posts.forEach(post => console.log(post.title));
 * } catch (error) {
 *   console.error("Error al obtener posts:", error);
 * }
 *
 * @see {@link fetchFromApi} - Función base para peticiones HTTP.
 * @see {@link https://jsonplaceholder.typicode.com/posts?userId=:id} - Endpoint de la API.
 * @since 1.0.0
 */
const getPostsByUser = (userId) => {
  return fetchFromApi(`posts?userId=${userId}`);
};

export { getPostsByUser };
