import { fetchFromApi } from "@/lib/api-client";

/**
 * @fileoverview Adaptador de Infraestructura para Posts.
 * Aísla el dominio de la comunicación con el endpoint de publicaciones.
 */

/**
 * Obtiene todas las publicaciones de un usuario específico.
 * Sigue el patrón Early Return ante fallos de red.
 * 
 * @async
 * @param {number|string} userId - ID del propietario de los posts.
 * @returns {Promise<Array<Object>>} Array de posts mapeado por el cliente.
 */
export const getPostsByUser = async (userId) => {
  if (!userId) return [];

  try {
    const posts = await fetchFromApi(`posts?userId=${userId}`);
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    // Error resiliente: retorno de array vacío ante fallos para no romper el servicio.
    console.warn(`Infrastructure Warning: Failed to fetch posts for user ${userId}`, error);
    return [];
  }
};
