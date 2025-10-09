/**
 * @file Funciones para interactuar con el endpoint de posts de la API.
 * @author Tu Nombre
 */

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Obtiene todas las publicaciones de un usuario específico.
 * @param {number|string} userId - El ID del usuario.
 * @returns {Promise<Array<object>>} Una promesa que resuelve a un array de objetos de post.
 * @throws {Error} Si la respuesta de la red no es exitosa.
 */
export const getPostsByUser = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);

    if (!response.ok) {
        throw new Error(
            `Error al obtener los posts: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
};
