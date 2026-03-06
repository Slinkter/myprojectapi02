/**
 * @fileoverview Cliente HTTP centralizado para la infraestructura del proyecto.
 * Proporciona una capa de abstracción sobre la API nativa `fetch` para interactuar
 * con JSONPlaceholder, garantizando aislamiento y manejo consistente de errores.
 * 
 * @module api-client
 */

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Realiza una petición HTTP GET sanitizada a la API externa.
 * Implementa el patrón Early Return para gestionar fallos de red y respuestas inválidas.
 * 
 * @async
 * @function fetchFromApi
 * @param {string} endpoint - El endpoint relativo al que se realizará la petición (ej: "users/1").
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
export const fetchFromApi = async (endpoint) => {
  if (!endpoint) throw new Error("Endpoint is required");

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);

    // Early Return: Error HTTP (4xx, 5xx)
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

    // Error de red o parseo.
    const networkError = new Error(`Network Error: ${error.message}`);
    networkError.status = 500;
    throw networkError;
  }
};
