import { fetchFromApi } from "@/lib/api.config";

/**
 * @fileoverview Cliente API para operaciones relacionadas con usuarios.
 * Proporciona funciones para interactuar con los endpoints de usuarios
 * de la API JSONPlaceholder.
 *
 * @module user-api
 * @category API Clients
 * @since 1.0.0
 */

/**
 * Obtiene los datos de un usuario específico por su ID.
 *
 * Realiza una petición GET al endpoint `/users/:id` de JSONPlaceholder API.
 *
 * @async
 * @function getUser
 * @category Data Access
 *
 * @param {number|string} userId - El ID del usuario a obtener (1-10).
 *
 * @returns {Promise<Object>} Promesa que resuelve con los datos del usuario.
 * @returns {number} returns.id - ID único del usuario.
 * @returns {string} returns.name - Nombre completo del usuario.
 * @returns {string} returns.username - Nombre de usuario único.
 * @returns {string} returns.email - Dirección de correo electrónico.
 * @returns {Object} returns.address - Información de dirección.
 * @returns {Object} returns.company - Información de la empresa.
 *
 * @throws {Error} Si la petición HTTP falla.
 *
 * @example
 * const user = await getUser(1);
 * console.log(user.name); // "Leanne Graham"
 *
 * @see {@link fetchFromApi} - Función base para peticiones HTTP.
 * @since 1.0.0
 */
const getUser = (userId) => {
  return fetchFromApi(`users/${userId}`);
};

export { getUser };
