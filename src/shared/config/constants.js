/**
 * @fileoverview Configuración global de constantes de la aplicación.
 * Centraliza las URLs de API, límites de búsqueda y configuraciones de infraestructura.
 * 
 * @module constants
 */

/** URL base para la infraestructura de JSONPlaceholder. */
export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/** Límites de búsqueda de usuarios basados en la capacidad estable de la API. */
export const SEARCH_LIMITS = {
  MIN_ID: 1,
  MAX_ID: 10,
};

/** Tiempos de espera y configuraciones de UX. */
export const UX_CONFIG = {
  DEBOUNCE_DELAY: 400, // milisegundos
  RETRY_ATTEMPTS: 3,
};
