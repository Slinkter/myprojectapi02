/**
 * @fileoverview Motor de búsqueda encargado de resolver la identidad del usuario
 * basándose en la entrada del usuario (ID o nombre de usuario).
 * 
 * @module SearchEngine
 */

import { normalizeText } from "@/shared/lib/utils";

/**
 * Verifica si una cadena representa un identificador numérico válido.
 * 
 * @param {string} input - La cadena a validar.
 * @returns {boolean} True si el input consiste únicamente en dígitos.
 */
export const isNumericId = (input) => /^\d+$/.test(input);

/**
 * Busca un usuario en la lista de caché usando un Hash Map O(1).
 * 
 * @param {string} username - Nombre de usuario a buscar.
 * @param {Record<string, number>} cachedUsersByUsername - Mapa de usuarios indexados por username normalizado.
 * @returns {number|null} El ID del usuario si se encuentra, de lo contrario null.
 */
export const findUserByUsername = (username, cachedUsersByUsername = {}) => {
  if (typeof cachedUsersByUsername !== "object" || cachedUsersByUsername === null) return null;

  const normalizedInput = normalizeText(username);
  // Búsqueda O(1) en el diccionario
  return cachedUsersByUsername[normalizedInput] || null;
};

/**
 * Resuelve el valor de búsqueda ingresado por el usuario a un ID numérico.
 * 
 * Implementa una lógica de resolución priorizando IDs numéricos y luego
 * buscando en la caché O(1) de usuarios por nombre de usuario.
 * 
 * @param {string} input - El término de búsqueda ingresado por el usuario.
 * @param {Record<string, number>} cachedUsersByUsername - Mapa de nombres a IDs.
 * @returns {number|null} El ID del usuario resuelto o null si no es posible determinar la identidad.
 * 
 * @example
 * resolveSearchQuery("123", {}) -> 123
 * resolveSearchQuery("john_doe", {"john doe": 10}) -> 10
 * resolveSearchQuery("unknown", {}) -> null
 * resolveSearchQuery("", {}) -> null
 */
export const resolveSearchQuery = (input, cachedUsersByUsername = {}) => {
  console.log("[DEBUG: search-engine] resolveSearchQuery input:", input);
  
  if (input === null || input === undefined) return null;
  
  const stringInput = String(input).trim();
  if (!stringInput) return null;
  
  // Caso 1: El input es un ID numérico directo
  if (isNumericId(stringInput)) {
    const id = parseInt(stringInput, 10);
    console.log("[DEBUG: search-engine] Numeric ID detected:", id);
    return id;
  }
  
  // Caso 2: El input es un nombre de usuario que debe resolverse contra la caché O(1)
  const resolved = findUserByUsername(stringInput, cachedUsersByUsername);
  console.log("[DEBUG: search-engine] Cache resolution result:", resolved);
  return resolved;
};
