import { fetchFromApi } from "@/lib/api.config";

/**
 * Obtiene un usuario específico por su ID.
 * 
 * @async
 * @function getUser
 * @param {number|string} id - ID del usuario.
 * @returns {Promise<Object>} Datos del usuario o un objeto vacío si es 404.
 */
export const getUser = async (id) => {
  try {
    return await fetchFromApi(`users/${id}`);
  } catch (error) {
    if (error.message.includes("404")) return {};
    throw error;
  }
};

/**
 * Obtiene la lista completa de usuarios.
 * 
 * @async
 * @function getAllUsers
 * @returns {Promise<Array<Object>>} Lista de todos los usuarios.
 */
export const getAllUsers = async () => {
  return await fetchFromApi("users");
};
