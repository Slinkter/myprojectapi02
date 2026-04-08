/**
 * @fileoverview Motor de búsqueda encargado de resolver la identidad del usuario
 * basándose en la entrada del usuario (ID o nombre de usuario).
 * 
 * @module SearchEngine
 */

import { normalizeText } from "@/shared/lib/utils";

/**
 * Resuelve el valor de búsqueda ingresado por el usuario.
 * 
 * @param {string} input - El la entrada del usuario.
 * @param {Array} cachedUsers - Lista de usuarios cargados en el estado global.
 * @returns {string|number|null} El ID del usuario resuelto o null si no se encuentra.
 * 
 * @example
 * resolveSearchQuery("1", []) -> 1
 * resolveSearchQuery("john_doe", [{username: "John Doe", id: 2}, {username: "Jane Doe", id: 5}]) -> 2
 * resolveSearchQuery("unknown", []) -> null
 */
export const resolveSearchQuery = (input, cachedUsers = []) => {
  const trimmedInput = input.trim();
  
  if (!trimmedInput) return null;

  // Caso 1: El input es un ID numérico
  if (/^\d+$/.test(trimmedInput)) {
    return parseInt(trimmedInput, 10);
  }

  // Caso 2: El input es un nombre de usuario
  const normalizedInput = normalizeText(trimmedInput);
  const foundUser = cachedUsers.find(user => 
    normalizeText(user.username) === normalizedInput
  );

  return foundUser ? foundUser.id : null;
};
