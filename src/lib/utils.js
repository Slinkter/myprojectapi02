/**
 * @fileoverview Utilidades centrales para la gestión de estilos CSS.
 * Proporciona el patrón 'cn' para manejar clases condicionales y resolución
 * de conflictos de Tailwind CSS de forma eficiente.
 * 
 * @module utils
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina múltiples clases de CSS resolviendo conflictos de Tailwind.
 * Utiliza 'clsx' para manejar la lógica condicional y 'twMerge' para asegurar
 * que las clases posteriores sobrescriban correctamente a las anteriores.
 * 
 * @function cn
 * @param {...(string|Object|Array|undefined|null|boolean)} inputs - Clases o estructuras condicionales.
 * @returns {string} Una cadena de clases limpia y optimizada.
 * 
 * @example
 * ```javascript
 * // Clases condicionales sin conflictos
 * cn("px-4 py-2", isLarge && "px-8", className); 
 * ```
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
