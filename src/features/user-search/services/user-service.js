import { getUser, getAllUsers } from "../api/user.api";
import { getPostsByUser } from "../api/post.api";
import { mapRawUser, mapRawPosts } from "../api/user.mappers";

/**
 * @fileoverview Application Service para el dominio de Usuarios.
 * Coordina la infraestructura (API) y el dominio (Mappers).
 * Sigue el principio de Single Responsibility.
 */

/**
 * Obtiene el perfil completo de un usuario con sus posts.
 * Aplica el patrón Early Return para casos de usuario inexistente.
 * 
 * @async
 * @param {number|string} userId - Identificador único del usuario.
 * @returns {Promise<{user: Object|null, posts: Array}>} Perfil de usuario mapeado.
 */
export const fetchUserProfileById = async (userId) => {
  if (!userId) return { user: null, posts: [] };

  const [rawUser, rawPosts] = await Promise.all([
    getUser(userId),
    getPostsByUser(userId),
  ]);

  // Si el usuario no existe o está vacío, retorno temprano.
  if (!rawUser || Object.keys(rawUser).length === 0) {
    return { user: null, posts: [] };
  }

  const user = mapRawUser(rawUser);
  const posts = mapRawPosts(rawPosts);

  return { user, posts };
};

/**
 * Obtiene la lista completa de usuarios mapeada para el dominio.
 * Filtra registros inválidos para asegurar la integridad.
 * 
 * @async
 * @returns {Promise<Array<Object>>} Lista de usuarios sanitizada.
 */
export const fetchAllUsers = async () => {
  const rawUsers = await getAllUsers();
  
  if (!Array.isArray(rawUsers)) return [];

  return rawUsers
    .map(mapRawUser)
    .filter(user => user && user.id); // Asegura que solo pasen usuarios con ID válido.
};
