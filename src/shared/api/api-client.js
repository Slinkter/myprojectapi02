/**
 * @fileoverview
 * Cliente HTTP centralizado para la infraestructura del proyecto.
 * Proporciona una capa de abstracción sobre la API nativa `fetch` para interactuar
 * con JSONPlaceholder, garantizando aislamiento y manejo consistente de errores.
 *
 * @module api-client
 */

import { API_BASE_URL } from "@/shared/config/constants";

/**
 * Realiza una petición HTTP GET sanitizada a la API externa.
 * Implementa el patrón Early Return para gestionar fallos de red y respuestas inválidas.
 *
 * @async
 * @function fetchFromApi
 * @param {string} endpoint - El endpoint relativo al que se realizará la petición (ej: "users/1").
 * @param {RequestInit} [options={}] - Opciones de configuración para la petición (ej: signal).
 * @returns {Promise<Object|Array>} Una promesa que resuelve con los datos parseados de la respuesta.
 *
 * @throws {Error} Lanza un error con la propiedad `status` si la respuesta no es exitosa (4xx, 5xx).
 * @throws {Error} Lanza un error de red (status 500) si la petición falla por problemas de conectividad.
 *
 * @example
 * ```javascript
 * try {
 *   const user = await fetchFromApi("users/1");
 *   console.log(user.name); // "Leanne Graham"
 * } catch (error) {
 *   if (error.status === 404) {
 *     console.error("Usuario no encontrado");
 *   }
 * }
 * ```
 */
export const fetchFromApi = async (endpoint, options = {}) => {
    if (!endpoint) throw new Error("Endpoint is required");

    try {
        const url = `${API_BASE_URL}/${endpoint}`;
        const response = await fetch(url, options);

        // responde != 200 , Early Return: Error HTTP (4xx, 5xx)
        if (!response.ok) {
            const error = new Error(`Infrastructure Error: ${response.status}`);
            error.status = response.status;
            throw error;
        }

        const data = await response.json();

        // Early Return: Datos vacíos o nulos
        if (data === null || data === undefined) {
            return {};
        }

        return data;
    } catch (error) {
        // Si ya es un error con status, lo relanzamos.
        if (error.status) throw error;

        // Si es un error de cancelación (AbortError), lo relanzamos de forma limpia.
        if (error.name === "AbortError") throw error;

        // Error de red o parseo.
        const networkError = new Error(`Network Error: ${error.message}`);
        networkError.status = 500;
        throw networkError;
    }
};
