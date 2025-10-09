/**
 * @file Funciones para interactuar con el endpoint de usuarios de la API.
 * @author Tu Nombre
 */

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Obtiene los datos de un usuario específico por su ID.
 * @param {number|string} userId - El ID del usuario a obtener.
 * @returns {Promise<object>} Una promesa que resuelve al objeto del usuario.
 * @throws {Error} Si la respuesta de la red no es exitosa.
 */
export const getUser = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);

    if (!response.ok) {
        throw new Error(
            `Error al obtener el usuario: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
};
