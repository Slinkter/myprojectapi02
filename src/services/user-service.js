import { getUser } from "../api/user";
import { getPostsByUser } from "../api/post";

/**
 * Orquesta las llamadas a la API para obtener el perfil completo de un usuario,
 * incluyendo sus datos personales y sus publicaciones.
 *
 * @param {string | number} userId El ID del usuario a buscar.
 * @returns {Promise<{user: object, posts: Array}>} Un objeto que contiene los datos del usuario y su lista de posts.
 */
export const fetchUserProfile = async (userId) => {
    // Se ejecutan ambas promesas en paralelo para mayor eficiencia.
    const [user, posts] = await Promise.all([
        getUser(userId),
        getPostsByUser(userId),
    ]);

    // La API de JSONPlaceholder devuelve {} si no encuentra el usuario.
    // Esta comprobación explícita hace que el servicio sea más robusto.
    if (user && Object.keys(user).length === 0) {
        return { user: null, posts: [] };
    }

    return { user, posts };
};
