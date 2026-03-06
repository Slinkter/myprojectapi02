/**
 * @fileoverview Cliente HTTP centralizado para infraestructura.
 * Proporciona aislamiento de la API externa (JSONPlaceholder).
 * Sigue el principio de Single Responsibility.
 */

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Realiza una petición HTTP GET sanitizada.
 * Aplica Early Return para manejo de errores de red y respuesta.
 * 
 * @async
 * @param {string} endpoint - El endpoint relativo (sin barra inicial).
 * @returns {Promise<Object|Array>} Datos parseados de la respuesta.
 * @throws {Error} Con propiedad 'status' para manejo programático.
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
