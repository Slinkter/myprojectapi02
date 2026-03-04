import { fetchFromApi } from "@/lib/api.config";

/**
 * Obtiene todas las publicaciones de un usuario específico.
 * 
 * @async
 * @function getPostsByUser
 * @param {number|string} userId - ID del usuario propietario de los posts.
 * @returns {Promise<Array<Object>>} Array de objetos representando los posts.
 */
export const getPostsByUser = async (userId) => {
  return await fetchFromApi(`posts?userId=${userId}`);
};
