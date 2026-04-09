/**
 * @fileoverview
 * Application Service para el dominio de Usuarios.
 * Actúa como orquestador entre la capa de infraestructura (API Adapters)
 * y la capa de dominio (Mappers).
 * Sigue el principio de Single Responsibility
 * al centralizar la lógica de negocio para obtener datos de usuario complejos.
 *
 * @module user-service
 */

import { getUser, getAllUsers } from "@/entities/user/api/user.api";
import { getPostsByUser } from "@/entities/post/api/post.api";
import { mapRawUser } from "@/entities/user/domain/user.mappers";
import { mapRawPosts } from "@/entities/post/domain/post.mappers";

/**
 * @typedef {Object} UserEntity
 * @property {number} id - El identificador único del usuario.
 * @property {string} name - El nombre completo del usuario.
 * @property {string} username - El alias único del usuario.
 * @property {string} email - Correo electrónico.
 * @property {string} website - Sitio web personal.
 * @property {string} company - Nombre de la empresa.
 * @property {string} phone - Teléfono de contacto.
 * @property {string} address - Dirección física.
 * @property {string} companyExt - Extensión de la empresa.
 * @property {string} companyCatchPhrase - Slogan de la empresa.
 * @property {string} companySlogan - Slogan general de la empresa.
 * @property {string} userId - ID interno del sistema.
 */

/**
 * @typedef {Object} PostEntity
 * @property {number} id - ID de la publicación.
 * @property {number} userId - ID del usuario autor.
 * @property {string} title - Título del post.
 * @property {string} body - Contenido del post.
 */

/**
 * Recupera el perfil completo de un usuario, incluyendo sus publicaciones.
 * Coordina múltiples llamadas concurrentes a la API y utiliza mappers para
 * transformar los resultados en entidades seguras para el dominio.
 *
 * @async
 * @function fetchUserProfileById
 * @param {number|string} userId - El identificador único del usuario.
 * @param {RequestInit} [options={}] - Opciones para las peticiones fetch (ej: signal).
 * @returns {Promise<{user: UserEntity|null, posts: Array<PostEntity>}>} Un objeto que contiene el perfil
 * del usuario mapeado y su lista de publicaciones sanitizada.
 *
 * @example
 * ```javascript
 * const { user, posts } = await fetchUserProfileById(1);
 * if (user) {
 *   console.log(`Usuario ${user.name} tiene ${posts.length} posts.`);
 * }
 * ```
 */
export const fetchUserProfileById = async (userId, options = {}) => {
    console.log("[DEBUG: user-service] fetchUserProfileById called for userId:", userId);
    if (!userId) return { user: null, posts: [] };
    
    // Ejecutamos ambas promesas. No usamos Promise.all directo si queremos manejo individual resiliente.
    const userPromise = getUser(userId, options);
    const postsPromise = getPostsByUser(userId, options).catch((error) => {
        console.warn(
            "Non-critical Error: Failed to fetch posts, continuing with user profile.",
            error,
        );
        return []; // Retornamos array vacío si fallan los posts, pero permitimos que el usuario cargue.
    });
    
    const [rawUser, rawPosts] = await Promise.all([userPromise, postsPromise]);
    console.log("[DEBUG: user-service] rawUser received:", rawUser);
    console.log("[DEBUG: user-service] rawPosts received:", rawPosts);
    
    // Si el usuario no existe o la API retornó un objeto vacío, aplicamos Early Return.
    if (!rawUser || Object.keys(rawUser).length === 0) {
        console.warn("[DEBUG: user-service] rawUser is null or empty. Returning notFound state.");
        return { user: null, posts: [] };
    }
    
    const user = mapRawUser(rawUser);
    const posts = mapRawPosts(rawPosts);
    console.log("[DEBUG: user-service] mappedUser:", user);
    console.log("[DEBUG: user-service] mappedPosts:", posts);
    
    return { user, posts };
};

/**
 * Obtiene y sanitiza la lista de todos los usuarios registrados.
 * Aplica validaciones de integridad después del mapeo para asegurar que
 * solo los perfiles válidos lleguen a la UI.
 *
 * @async
 * @function fetchAllUsers
 * @param {RequestInit} [options={}] - Opciones para la petición fetch.
 * @returns {Promise<Array<UserEntity>>} Una promesa que resuelve con la lista completa de
 * usuarios del dominio.
 *
 * @example
 * ```javascript
 * const users = await fetchAllUsers();
 * const activeUsers = users.filter(u => u.id > 0);
 * ```
 */
export const fetchAllUsers = async (options = {}) => {
    const rawUsers = await getAllUsers(options);

    if (!Array.isArray(rawUsers)) return [];

    return rawUsers.map(mapRawUser).filter((user) => user && user.id); // Asegura integridad filtrando perfiles rotos.
};
