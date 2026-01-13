/**
 * @fileoverview Configuración base para las peticiones HTTP a la API externa.
 * Proporciona una función centralizada para realizar peticiones fetch
 * con manejo de errores consistente.
 *
 * @module api-config
 * @category Configuration
 * @since 1.0.0
 */

/**
 * URL base de la API JSONPlaceholder.
 * Todos los endpoints se construyen a partir de esta URL.
 *
 * @constant {string}
 * @default
 */
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Realiza una petición HTTP GET a la API externa.
 *
 * Esta función centraliza todas las peticiones HTTP del proyecto,
 * proporcionando un manejo consistente de errores y transformación
 * de respuestas. Automáticamente parsea las respuestas JSON y lanza
 * errores descriptivos cuando la petición falla.
 *
 * @async
 * @function fetchFromApi
 * @category HTTP Client
 *
 * @param {string} endpoint - El endpoint relativo a la URL base (sin barra inicial).
 *                           Ejemplo: "users/1" o "posts?userId=1"
 *
 * @returns {Promise<Object|Array>} Promesa que resuelve con los datos parseados de la respuesta JSON.
 *
 * @throws {Error} Lanza un error si la respuesta HTTP no es exitosa (status >= 400).
 *                El mensaje del error incluye el código de estado HTTP.
 * @throws {Error} Lanza un error si hay problemas de red (sin conexión, timeout, etc.).
 * @throws {Error} Lanza un error si la respuesta no es JSON válido.
 *
 * @example
 * // Obtener un usuario
 * const user = await fetchFromApi('users/1');
 * console.log(user.name);
 *
 * @example
 * // Obtener posts con query params
 * const posts = await fetchFromApi('posts?userId=1');
 * console.log(posts.length);
 *
 * @example
 * // Manejo de errores
 * try {
 *   const data = await fetchFromApi('users/999');
 * } catch (error) {
 *   if (error.message.includes('404')) {
 *     console.log('Recurso no encontrado');
 *   } else {
 *     console.error('Error de red:', error);
 *   }
 * }
 *
 * @see {@link https://jsonplaceholder.typicode.com} - Documentación de la API.
 * @since 1.0.0
 */
export const fetchFromApi = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
};
