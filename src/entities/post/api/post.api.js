/**
 * @fileoverview Adaptador de Infraestructura para Publicaciones (Posts).
 * Proporciona métodos para interactuar con el endpoint `/posts` de la API externa,
 * filtrando resultados por usuario.
 * 
 * @module post-api
 */

import { fetchFromApi } from "@/shared/api/api-client";
import { mapRawPosts } from "@/entities/post/domain/post.mappers";

/**
 * Obtiene todas las publicaciones de un usuario específico.
 * Implementa propagación de señal de aborto y manejo de errores mediante el cliente empresarial.
 * 
 * @async
 * @function getPostsByUser
 * @param {number|string} userId - El identificador único del usuario propietario de los posts.
 * @param {RequestInit} [options={}] - Opciones para la petición fetch, incluyendo el AbortSignal.
 * @returns {Promise<Array<Object>>} Una promesa que resuelve con un array de posts crudos.
 * @throws {ApiError} Lanzado cuando la respuesta de la API no es exitosa.
 * @throws {Error} Lanzado en caso de error de red o cancelación.
 * 
 * @example
 * ```javascript
 * try {
 *   const userPosts = await getPostsByUser(1, { signal: controller.signal });
 * } catch (error) {
 *   console.error("Error fetching posts:", error);
 * }
 * ```
 */
export const getPostsByUser = async (userId, options = {}) => {
  if (!userId) return [];

  const rawPosts = await fetchFromApi(`posts?userId=${userId}`, options);
  return mapRawPosts(rawPosts);
};
