/**
 * @fileoverview
 * Adaptador de Infraestructura para Usuarios.
 * Proporciona métodos para interactuar con el endpoint `/users` de la API externa,
 * aislando la lógica de comunicación del resto del dominio.
 *
 * @module user-api
 */

import { fetchFromApi } from "@/lib/api-client";

/**
 * Obtiene la información detallada de un usuario por su ID.
 * Implementa una estrategia de recuperación resiliente: si el usuario no existe (404),
 * retorna un objeto vacío en lugar de lanzar una excepción, facilitando el manejo
 * en las capas superiores.
 *
 * @async
 * @function getUser
 * @param {number|string} id - El identificador único del usuario en el sistema externo.
 * @param {RequestInit} [options={}] - Opciones para la petición fetch.
 * @returns {Promise<Object>} Una promesa que resuelve con los datos crudos del usuario
 * o un objeto vacío `{}` si el usuario no fue encontrado.
 *
 * @throws {Error} Lanza un error si ocurre un fallo de red o un error de servidor (5xx).
 *
 * @example
 * ```javascript
 * const user = await getUser(1);
 * if (user.id) {
 *   console.log(`Usuario encontrado: ${user.username}`);
 * }
 * ```
 */
export const getUser = async (id, options = {}) => {
    if (!id) return {};

    try {
        return await fetchFromApi(`users/${id}`, options);
    } catch (error) {
        // Si es un 404, retornamos objeto vacío de forma segura para la capa de servicios.
        if (error.status === 404) return {};
        throw error;
    }
};

/**
 * Obtiene la lista completa de todos los usuarios disponibles en el sistema.
 * Diseñado para ser no bloqueante: en caso de error crítico, retorna una lista vacía
 * y registra el error en la consola.
 *
 * @async
 * @function getAllUsers
 * @param {RequestInit} [options={}] - Opciones para la petición fetch.
 * @returns {Promise<Array<Object>>} Una promesa que resuelve con un array de objetos
 * de usuario crudos. Retorna `[]` si ocurre un error o no hay datos.
 *
 * @example
 * ```javascript
 * const allUsers = await getAllUsers();
 * console.log(`Total de usuarios recuperados: ${allUsers.length}`);
 * ```
 */
export const getAllUsers = async (options = {}) => {
    try {
        const users = await fetchFromApi("users", options);
        return Array.isArray(users) ? users : [];
    } catch (error) {
        // Error silencioso para la lista completa para no bloquear la app.
        console.error("Critical Error fetching all users:", error);
        return [];
    }
};
