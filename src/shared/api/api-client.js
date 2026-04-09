/**
 * @fileoverview
 * Cliente HTTP centralizado para la infraestructura de UserApp Pro.
 * Implementa estándares empresariales de resiliencia, tipado implícito para TypeScript
 * y manejo exhaustivo de errores mediante clases especializadas.
 *
 * @module api-client
 */

import { API_BASE_URL } from "@/shared/config/constants";

/**
 * Representa un error ocurrido durante una petición a la API.
 * Extiende la clase Error nativa para incluir metadatos del protocolo HTTP.
 */
export class ApiError extends Error {
    /** @type {number} Código de estado HTTP (ej: 404, 500) */
    status;
    /** @type {string} Mensaje de estado HTTP (ej: "Not Found") */
    statusText;
    /** @type {any} Cuerpo de la respuesta de error parseado */
    data;

    /**
     * @param {number} status - Código de estado HTTP.
     * @param {string} message - Mensaje descriptivo del error.
     * @param {string} [statusText="Unknown Error"] - Texto del estado HTTP.
     * @param {any} [data=null] - Datos adicionales provenientes de la API.
     */
    constructor(status, message, statusText = "Unknown Error", data = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.statusText = statusText;
        this.data = data;

        // Mantenemos la traza de la pila correcta en entornos V8
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}

/**
 * Configuración por defecto para todas las peticiones de la aplicación.
 */
const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

/**
 * Tiempo de espera predeterminado para las peticiones (en milisegundos).
 * 8 segundos es un estándar equilibrado para aplicaciones web.
 */
const DEFAULT_TIMEOUT = 8000;

/**
 * Wrapper robusto sobre la API `fetch` para realizar peticiones HTTP sanitizadas.
 * Implementa propagación de AbortSignal, timeouts automáticos y manejo de errores tipado.
 *
 * @async
 * @function fetchFromApi
 * @param {string} endpoint - Endpoint relativo a la URL base (ej: "users/1").
 * @param {RequestInit & { timeout?: number }} [options={}] - Opciones de la petición.
 * @param {number} [options.timeout] - Tiempo de espera opcional que sobrescribe el default.
 * @returns {Promise<any>} Promesa que resuelve con los datos parseados de la respuesta.
 * 
 * @throws {ApiError} Lanzado cuando la respuesta no es exitosa (4xx, 5xx).
 * @throws {Error} Lanzado en caso de error de red, tiempo de espera agotado o cancelación.
 *
 * @example
 * try {
 *   const data = await fetchFromApi("posts", { method: "POST", body: JSON.stringify(payload) });
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.error(`Error ${error.status}: ${error.message}`);
 *   }
 * }
 * 
 * @see {@link ApiError}
 */
export const fetchFromApi = async (endpoint, options = {}) => {
    // 1. Validación de entrada (Early Return)
    if (!endpoint) {
        throw new Error("El endpoint es obligatorio para realizar la petición.");
    }

    const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;

    // 2. Gestión de Señales y Timeout
    // Combinamos la señal proporcionada por el usuario con un timeout interno
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    // Si el usuario pasó una señal, debemos enlazarla con nuestro controller
    if (fetchOptions.signal) {
        fetchOptions.signal.addEventListener("abort", () => controller.abort());
    }

    try {
        const url = `${API_BASE_URL}/${endpoint}`;
        
        // Mezcla de headers estándar y personalizados
        const mergedOptions = {
            ...fetchOptions,
            headers: {
                ...DEFAULT_HEADERS,
                ...fetchOptions.headers,
            },
            signal: controller.signal,
        };

        const response = await fetch(url, mergedOptions);

        // 3. Manejo de respuestas no exitosas (Early Return)
        if (!response.ok) {
            let errorData = null;
            try {
                errorData = await response.json();
            } catch {
                // Ignorar si el cuerpo no es JSON
            }
            
            throw new ApiError(
                response.status,
                `Error de Infraestructura: ${response.statusText || response.status}`,
                response.statusText,
                errorData
            );
        }

        // 4. Parseo de datos y validación final
        const data = await response.json();

        // Early Return para respuestas vacías
        if (data === null || data === undefined) {
            return {};
        }

        return data;

    } catch (error) {
        // Propagar errores de cancelación/timeout sin envolverlos en ApiError
        if (error.name === "AbortError") {
            if (timeoutId) {
                // Distinguir entre timeout y cancelación manual si es posible
                // Nota: fetch nativo no distingue fácilmente, pero el mensaje suele ayudar
            }
            throw error;
        }

        // Si ya es un ApiError, relanzarlo directamente
        if (error instanceof ApiError) {
            throw error;
        }

        // Error genérico de red o parseo
        throw new Error(`Error de Red/Conectividad: ${error.message}`);
    } finally {
        clearTimeout(timeoutId);
    }
};
