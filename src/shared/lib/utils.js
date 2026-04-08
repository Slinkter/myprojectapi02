import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de Tailwind CSS de forma segura,
 * resolviendo conflictos de especificidad automáticamente.
 * 
 * @module utils
 * @param {...(string|Object|Array)} inputs - Clases a combinar
 * @returns {string} String de clases CSS optimizado
 * 
 * @example
 * ```javascript
 * cn("px-4 py-2", isLarge && "px-8", className); 
 * ```
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Normaliza una cadena de texto eliminando acentos, convirtiéndola a minúsculas
 * y eliminando caracteres no alfanuméricos para comparacionesinsensitive.
 * 
 * @param {string} text - El texto a normalizar.
 * @returns {string} El texto normalizado.
 */
export function normalizeText(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
