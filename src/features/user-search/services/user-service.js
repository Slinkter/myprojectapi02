import { getUser, getAllUsers } from "../api/user.api";
import { getPostsByUser } from "../api/post.api";

/**
 * @fileoverview Servicio de dominio para la gestión de perfiles de usuario.
 */

/**
 * Obtiene el perfil completo de un usuario por ID.
 * @async
 */
export const fetchUserProfileById = async (userId) => {
  const [user, posts] = await Promise.all([
    getUser(userId),
    getPostsByUser(userId),
  ]);

  if (user && Object.keys(user).length === 0) {
    return { user: null, posts: [] };
  }

  return { user, posts };
};

/**
 * Obtiene todos los usuarios del sistema.
 * Útil para búsqueda por nombre en el cliente.
 * @async
 */
export const fetchAllUsers = async () => {
  return await getAllUsers();
};
