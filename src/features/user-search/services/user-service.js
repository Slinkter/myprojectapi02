import { getUser, getAllUsers } from "../api/user.api";
import { getPostsByUser } from "../api/post.api";
import { mapRawUser, mapRawPosts } from "../api/user.mappers";

/**
 * @fileoverview Servicio de dominio para la gestión de perfiles de usuario.
 * Aplica mappers para asegurar la integridad de los datos.
 */

/**
 * Obtiene el perfil completo de un usuario por ID.
 * @async
 */
export const fetchUserProfileById = async (userId) => {
  const [rawUser, rawPosts] = await Promise.all([
    getUser(userId),
    getPostsByUser(userId),
  ]);

  // Aplicar Mappers para limpiar la data antes de que llegue al Store
  const user = mapRawUser(rawUser);
  const posts = mapRawPosts(rawPosts);

  return { user, posts };
};

/**
 * Obtiene todos los usuarios y los limpia para la búsqueda.
 * @async
 */
export const fetchAllUsers = async () => {
  const rawUsers = await getAllUsers();
  return rawUsers.map(mapRawUser).filter(Boolean);
};
