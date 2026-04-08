/**
 * @fileoverview Adaptador de Infraestructura para Publicaciones (Posts).
 * Proporciona métodos para interactuar con el endpoint `/posts` de la API externa,
 * filtrando resultados por usuario.
 * 
 * @module post-api
 */

import { fetchFromApi } from "@/lib/api-client";

/**
 * Obtiene todas las publicaciones de un usuario específico.
 * Sigue el patrón Early Return ante fallos de red o respuestas inesperadas,
 * garantizando que el servicio siempre reciba una estructura manejable (array).
 * 
 * @async
 * @function getPostsByUser
 * @param {number|string} userId - El identificador único del usuario propietario de los posts.
 * @param {RequestInit} [options={}] - Opciones para la petición fetch.
 * @returns {Promise<Array<Object>>} Una promesa que resuelve con un array de posts crudos.
 * Retorna un array vacío `[]` si el usuario no tiene posts o si ocurre un error.
 * 
 * @example
 * ```javascript
 * const userPosts = await getPostsByUser(1);
 * console.log(`Encontradas ${userPosts.length} publicaciones para el usuario 1`);
 * ```
 */
export const getPostsByUser = async (userId, options = {}) => {
  if (!userId) return [];

  try {
    const posts = await fetchFromApi(`posts?userId=${userId}`, options);
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    // Error resiliente: retorno de array vacío ante fallos para no romper el servicio.
    console.warn(`Infrastructure Warning: Failed to fetch posts for user ${userId}`, error);
    return [];
  }
};
