/**
 * @fileoverview
 * Adaptador de Infraestructura para Usuarios.
 * Proporciona métodos para interactuar con el endpoint `/users` de la API externa,
 * aislando la lógica de comunicación del resto del dominio mediante mappers.
 *
 * @module user-api
 */

import { fetchFromApi } from "@/shared/api/api-client";
import { mapRawUser, mapRawUsers } from "@/entities/user/domain/user.mappers";

/**
 * Obtiene la información detallada de un usuario por su ID.
 * Implementa una estrategia de recuperación resiliente: si el usuario no existe (404),
 * retorna null, facilitando el manejo de estados "notFound" en la capa de Store.
 *
 * @async
 * @function getUser
 * @param {number|string} id - El identificador único del usuario.
 * @param {RequestInit} [options={}] - Opciones para la petición fetch (incluye AbortSignal).
 * @returns {Promise<Object|null>} Usuario mapeado al dominio o null si no fue encontrado/inválido.
 *
 * @throws {ApiError} Lanza un error si ocurre un fallo de red o un error de servidor (5xx).
 *
 * @example
 * const user = await getUser(1, { signal: controller.signal });
 * if (user) console.log(user.name);
 */
export const getUser = async (id, options = {}) => {
    if (!id) return null;

    try {
        const endpoint = `users/${id}`;
        const rawUser = await fetchFromApi(endpoint, options);
        
        return mapRawUser(rawUser);
    } catch (error) {
        // Si es un 404, retornamos null para indicar "no encontrado" sin romper el flujo.
        if (error.status === 404) return null;
        throw error;
    }
};

/**
 * Obtiene la lista completa de todos los usuarios disponibles en el sistema.
 * Cada elemento de la lista es procesado a través de un mapper para asegurar
 * la consistencia de los datos en toda la aplicación.
 *
 * @async
 * @function getAllUsers
 * @param {RequestInit} [options={}] - Opciones para la petición fetch (incluye AbortSignal).
 * @returns {Promise<Array<Object>>} Lista de usuarios mapeados al dominio.
 *
 * @example
 * const users = await getAllUsers();
 * console.log(users.length);
 */
export const getAllUsers = async (options = {}) => {
    const endpoint = "users";
    const rawUsers = await fetchFromApi(endpoint, options);
    
    if (!Array.isArray(rawUsers)) return [];
    
    return mapRawUsers(rawUsers);
};
